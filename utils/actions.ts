"use server";

import {
  imageSchema,
  profileSchema,
  propertySchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser, clerkClient, getAuth } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { uploadImage } from "./supabase";
import { calculateTotals } from "./calculateTotals";

const renderError = (err: unknown): { message: string } => {
  console.log(err);

  return {
    message: err instanceof Error ? err.message : "Error occurred",
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Please login to access this route !");
  }
  if (!user.privateMetadata.hasProfile) {
    redirect("/profile/create");
  }

  return user;
};

export const createProfile = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();

    if (!user) throw new Error("Unauthorized");

    console.log(user);

    const rawData = Object.fromEntries(formData);

    const validateFields = validateWithZodSchema(profileSchema, rawData);

    console.log(validateFields);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validateFields,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        // attach profile metadata
        hasProfile: true,
      },
    });
  } catch (error) {
    console.log(error);
    renderError(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!profile) {
    redirect("/profile/create");
  }
  return profile;
};

export const updateProfile = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const rawData = Object.fromEntries(formData);

  const validateFields = validateWithZodSchema(profileSchema, rawData);

  try {
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validateFields,
    });
  } catch (error) {
    console.log(error);
    renderError(error);
  }

  revalidatePath("/profile", "page");

  return {
    message: "Profile updated",
  };
};

export const updateProfileImage = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const image = formData.get("image") as File;

  const user = await getAuthUser();

  try {
    const image = formData.get("image") as File;
    const validateFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validateFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath.publicUrl,
      },
    });

    revalidatePath("/profile", "layout");
    return {
      message: "Profile image updated",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const createProperty = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const image = formData.get("image") as File;

    console.log("Image file from form is ", image.name);

    const validateFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);

    console.log(JSON.stringify({ validateFields, fullPath }));

    const newProperty = await db.property.create({
      data: {
        ...validateFields,
        image: fullPath.publicUrl,
        profileId: user.id,
      },
    });

    console.log("new property is ", newProperty);
  } catch (error) {
    return renderError(error);
  }

  redirect("/");
};

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
      image: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return properties;
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  try {
    const user = await getAuthUser();

    const favorite = await db.favorite.findFirst({
      where: {
        propertyId,
        profileId: user.id,
      },
      select: {
        id: true,
      },
    });

    return favorite?.id || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  try {
    const user = await getAuthUser();
    console.log({ ...prevState });

    if (prevState.favoriteId) {
      await db.favorite.delete({
        where: {
          id: prevState.favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId: prevState.propertyId,
          profileId: user.id,
        },
      });
    }

    revalidatePath(prevState.pathname, "layout");

    return { message: "Favorite toggle button" };
  } catch (error) {
    throw error;
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  });

  return favorites.map((favorite) => favorite.property);
};

export const fetchPropertiesDetails = async (id: string) => {
  return await db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });
};

export const createReview = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validateFields,
        profileId: user.id,
      },
    });

    revalidatePath(`/properties/${validateFields.propertyId}`, "page");

    return {
      message: "Review created",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await db.review.findMany({
    where: {
      propertyId: propertyId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const fetchReviewByUser = async () => {
  const user = await getAuthUser();

  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return reviews;
};

export const deleteReview = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;

  try {
    const user = await getAuthUser();
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });

    revalidatePath(`/reviews`, "page");

    return {
      message: "Review deleted",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyRating = async (propertyId: string) => {
  const result = await db.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  });

  return {
    rating: result[0]?._avg.rating?.toFixed() ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const findExistingReviews = async (
  userId: string,
  propertyId: string
) => {
  return await db.review.findFirst({
    where: {
      profileId: userId,
      propertyId,
    },
  });
};

export const createBooking = async (prevState: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const user = await getAuthUser();

  await db.booking.deleteMany({
    where: {
      profileId: user.id,
      paymentStatus: false,
    },
  });

  let bookingId: null | string = null;

  const { propertyId, checkIn, checkOut } = prevState;

  const property = await db.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      price: true,
    },
  });

  if (!property) {
    return {
      message: "Property not found",
    };
  }

  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });

  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user.id,
        propertyId,
      },
    });

    bookingId = booking.id;
  } catch (error) {
    return renderError(error);
  }

  redirect(`/checkout?bookingId=${bookingId}`);
};

export const deleteBooking = async () => {
  const user = await getAuthUser();
  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
      paymentStatus: true,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      checkIn: "desc",
    },
  });

  return bookings;
};

export async function deleteBookingAction(prevState: { bookingId: string }) {
  const { bookingId } = prevState;
  const user = await getAuthUser();

  try {
    const result = await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    });

    revalidatePath("/bookings");
    return { message: "Booking deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
}
