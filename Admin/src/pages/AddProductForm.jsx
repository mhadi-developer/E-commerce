import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiSelect from "react-multi-select-component";
import RichTextEditor from "../components/TipTap-Editor/RichTextEditor.jsx";
import { ToastContainer, toast } from "react-toastify";

/* -------------------- ZOD SCHEMA -------------------- */
const productSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  sku: z.string().min(1),
  shortDescription: z.string().min(5),
  longDescription: z.string(),
  price: z.number().positive(),
  discount: z.number().min(0).max(90).optional(),
  category: z.string().min(1),
  stock: z.number().min(0),
  sizes: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  colors: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  videoLink: z.string().url().optional().or(z.literal("")),
});

export default function AddProductForm() {
  const mainImageRef = useRef(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const { register, handleSubmit, control, watch, setValue, reset , formState:{error , isSubmitted} } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      slug: "",
      sku: "",
      shortDescription: "",
      longDescription: "",
      price: 0,
      discount: 0,
      category: "",
      stock: 0,
      sizes: [],
      colors: [],
      videoLink: "",
    },
  });

  const price = watch("price");
  const discount = watch("discount");
  const discountPrice =
    price && discount ? (price * discount) / 100 : price;

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (data) => {
    setSubmitLoading(true);

    try {
      console.log("FORM DATA (react-hook-form):", data);

      const formData = new FormData();

      Object.entries({
        title: data.title,
        slug: data.slug,
        sku: data.sku,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        price: data.price,
        discount: data.discount || 0,
        discountPrice,
        stock: data.stock,
        category: data.category,
      }).forEach(([k, v]) => formData.append(k, String(v)));

      formData.append("sizes", JSON.stringify(data.sizes));
      formData.append("colors", JSON.stringify(data.colors));

      if (data.videoLink) formData.append("videoLink", data.videoLink);
      if (mainImage?.file) formData.append("mainImage", mainImage.file);

      galleryImages.forEach((img) =>
        formData.append("galleryImages", img.file)
      );

      console.log("FORM DATA (FormData entries):");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // console.log("****submitted data to backend", Object.fromEntries(formData).entries());

      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/add`, {
        method: "POST",
        body: formData,
      });

      console.log('result', res);
      

      if (!res.ok) throw new Error();

      toast.success("Product added successfully");
      reset();
      setMainImage(null);
      setGalleryImages([]);
    } catch (error) {
      toast.error("Submission failed");
      console.log("error in form", error);
      
    } finally {
      setSubmitLoading(false);
    }
  };

  /* -------------------- FETCH CATEGORIES -------------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
        credentials: "include",
      });

      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
    
    
  }, []);
  console.log("****categories from Backend******", categories);
  /*--------------------- Return Jsx --------------------*/

  return (
    <div className="container bg-secondary mt-4 mb-5 py-5 px-5 rounded">
      <h2 className="mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label fw-semibold">Product Title</label>
          <input className="form-control" {...register("title")} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Slug</label>
          <input className="form-control" {...register("slug")} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">SKU</label>
          <input className="form-control" {...register("sku")} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Short Description</label>
          <textarea
            className="form-control"
            {...register("shortDescription")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Long Description</label>
          <Controller
            name="longDescription"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Price</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { valueAsNumber: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Discount (%)</label>
          <input
            type="number"
            className="form-control"
            {...register("discount", { valueAsNumber: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Final Price</label>
          <input
            type="number"
            className="form-control"
            value={discountPrice}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <select className="form-select" {...register("category")}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            {...register("stock", { valueAsNumber: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Available Sizes</label>
          <MultiSelect
            options={[
              { label: "S", value: "S" },
              { label: "M", value: "M" },
              { label: "L", value: "L" },
              { label: "XL", value: "XL" },
            ]}
            value={watch("sizes")}
            onChange={(v) => setValue("sizes", v, { shouldValidate: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Available Colors</label>
          <MultiSelect
            options={[
              { label: "Black", value: "black" },
              { label: "White", value: "white" },
              { label: "Red", value: "red" },
              { label: "Blue", value: "blue" },
              { label: "Green", value: "green" },
              { label: "Pink", value: "pink" },
            ]}
            value={watch("colors")}
            onChange={(v) => setValue("colors", v, { shouldValidate: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Product Video URL</label>
          <input className="form-control" {...register("videoLink")} />
        </div>

        {/* MAIN IMAGE */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Main Product Image</label>

          <input
            type="file"
            className="form-control"
            ref={mainImageRef}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              if (mainImage?.url) {
                URL.revokeObjectURL(mainImage.url);
              }

              setMainImage({
                file,
                url: URL.createObjectURL(file),
              });
            }}
          />

          {mainImage && (
            <div className="mt-3 position-relative" style={{ width: 180 }}>
              <img
                src={mainImage.url}
                alt="Main preview"
                className="img-fluid rounded border"
                style={{ objectFit: "cover" }}
              />

              <button
                type="button"
                className="btn btn-sm btn-primary position-absolute top-0 end-0 m-1"
                onClick={() => {
                  URL.revokeObjectURL(mainImage.url);
                  setMainImage(null);
                  if (mainImageRef.current) {
                    mainImageRef.current.value = "";
                  }
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* GALLERY IMAGES */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Gallery Images</label>

          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);

              const mapped = files.map((file) => ({
                id: crypto.randomUUID(),
                file,
                url: URL.createObjectURL(file),
              }));

              setGalleryImages((prev) => [...prev, ...mapped]);
              e.target.value = "";
            }}
          />

          {galleryImages.length > 0 && (
            <div className="d-flex flex-wrap gap-3 mt-3">
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  className="position-relative"
                  style={{ width: 140 }}
                >
                  <img
                    src={img.url}
                    alt="Gallery preview"
                    className="img-fluid rounded border"
                    style={{ height: 140, objectFit: "cover" }}
                  />

                  <button
                    type="button"
                    className="btn btn-sm btn-primary position-absolute top-0 end-0 m-1"
                    onClick={() => {
                      URL.revokeObjectURL(img.url);
                      setGalleryImages((prev) =>
                        prev.filter((i) => i.id !== img.id),
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="btn btn-primary w-100" disabled={submitLoading}>
          {submitLoading ? "Submitting..." : "Add Product"}
        </button>
      </form>

      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}
