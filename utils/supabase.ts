import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { v4 } from "uuid";

const bucket = "images";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadImage(image: File) {
  try {
    const newName = `${image.name}-${v4()}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(newName, image, {
        contentType: image.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (!data) throw new Error("Image upload failed !");

    if (error) throw error;

    const publicUrlResult = supabase.storage.from(bucket).getPublicUrl(newName);

    return publicUrlResult.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
