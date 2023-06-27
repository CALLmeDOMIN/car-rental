'use client'

import { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'

interface FormProps {
    className?: string
}

const onSubmit = async (data: any) => {
    await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 200) {
            alert('Message sent!')
        } else {
            alert('Error sending message')
        }
    })
}

const Form: FunctionComponent<FormProps> = ({ className }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    })

    return (
        <div className={className}>
            <div className="w-full max-w-2xl">
                <h1 className="mb-4 hidden text-center text-4xl font-semibold lg:block">
                    Get <span className="text-accent">in touch</span>
                </h1>

                <form
                    onSubmit={handleSubmit((data) => {
                        onSubmit(data)
                        setTimeout(() => reset(), 3000)
                    })}
                    className="flex w-full flex-col justify-center gap-4 px-4"
                >
                    <span className="my-10 flex w-full flex-col justify-around px-4 lg:flex-row">
                        <span className="flex flex-col justify-center">
                            <label
                                className="text-xl font-semibold"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                className="mb-4 w-full rounded-md border bg-background p-4 text-text shadow-md dark:bg-darkbg dark:text-darktext"
                                type="text"
                                {...register('name')}
                                id="name"
                            />

                            <label
                                className="text-xl font-semibold"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                {...(register('email'), { required: true })}
                                id="email"
                                pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$"
                                className="mb-4 w-full rounded-md border bg-background p-4 text-text shadow-md dark:bg-darkbg dark:text-darktext"
                            />
                        </span>
                        <span>
                            <label
                                className="text-xl font-semibold"
                                htmlFor="message"
                            >
                                Message
                            </label>
                            <textarea
                                className="h-full w-full rounded-md border bg-background p-4 text-text shadow-md dark:bg-darkbg dark:text-darktext"
                                {...register('message')}
                                id="message"
                                rows={5}
                            ></textarea>
                        </span>
                    </span>
                    <input
                        type="submit"
                        value="Send"
                        className="mt-4 cursor-pointer rounded-md bg-primary-button p-4 font-semibold text-background shadow-md dark:text-darkbg"
                    />
                </form>
            </div>
        </div>
    )
}

export default Form
