"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";

interface NewsFormProps {
  className?: string;
}

const onSubmit = async ({ data }: { data: { email: string } }) => {
  await fetch("/api/newsletter", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 200) {
      alert("Message sent!");
    } else {
      alert("Error sending message, you might need to log in");
    }
  });
};

const NewsForm: FunctionComponent<NewsFormProps> = ({ className }) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <form
      className={" " + className}
      onSubmit={handleSubmit((data) => {
        onSubmit({ data });
        setTimeout(() => reset(), 3000);
      })}
    >
      <label htmlFor="email" className="text-background dark:text-darkbg">
        Subscribe to newsletter
      </label>
      <input
        {...register("email", {
          required:
            "Plese provide email if you want to subscribe to newsletter",
        })}
        type="text"
        name="email"
        id="email"
        className="focus:ring-primary-button-500 w-full rounded-md border-none bg-background py-1.5 pl-4 pr-10 text-left text-text shadow-sm ring-1 ring-inset ring-background placeholder:text-text/20 focus:outline-none focus:ring-2 dark:bg-darkbg dark:text-darktext dark:ring-transparent dark:placeholder:text-darktext sm:text-sm sm:leading-6"
        placeholder="placeholder@email.com"
        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$"
      />
      <button
        className="absolute bottom-0 right-0 p-1.5 pr-2 text-accent dark:text-background"
        onClick={() => alert("Thank you for subscribing!")}
        type="submit"
      >
        <IconArrowNarrowRight size={24} aria-label="arrow right" />
      </button>
    </form>
  );
};

export default NewsForm;
