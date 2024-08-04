import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest, type NextResponse } from "next/server";
import db from "@/utils/db";
import { formatDate } from "@/utils/format";

export const POST = async (req: NextRequest, res: NextResponse) => {
  // for production - get main domain
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { bookingId } = await req.json();

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!booking) {
    return Response.json(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const {
    totalNights,
    orderTotal,
    checkIn,
    checkOut,
    property: { image, name },
  } = booking as {
    totalNights: number;
    orderTotal: number;
    checkIn: Date;
    checkOut: Date;
    property: {
      image: string;
      name: string;
    };
  };

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: {
        bookingId: booking.id,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: orderTotal * 100,
            product_data: {
              name: `${name}`,
              images: [image],
              description: `Stay in this wonderful place for ${totalNights}, from ${formatDate(
                checkIn
              )} to ${formatDate(checkOut)}. Enjoy your stay.`,
            },
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log("Stripe error ", error);
    return Response.json(null, {
      status: 500,
      statusText: "Internal server error",
    });
  }
};
