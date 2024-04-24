"use client"

import * as z from "zod";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export default function Home() {
	const [submitting, setSubmitting] = useState(false); // State to track form submission

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	})

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setSubmitting(true); // Set submitting state to true when form is submitted
		// Perform form submission logic here, like sending data to a server
		console.log(values); // For demonstration, logging form data to console
		setSubmitting(false); // Reset submitting state after submission is complete
	};

	return (
		<div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
			<div className="w-full m-auto bg-white lg:max-w-lg">
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-center">Sign in</CardTitle>
						<CardDescription className="text-center">
							Enter your email and password to login
						</CardDescription>
					</CardHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<CardContent className="grid gap-4">
								<div className="grid gap-4">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="john.doe@email.com"
														type="email" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)} />
								</div>
								<div className="grid gap-4">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="••••••••••"
														type="password" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)} />
								</div>

							</CardContent>
							<CardFooter className="flex flex-col">
								<Button type="submit" className="w-full" disabled={submitting}>
									{submitting ? "Submitting..." : "Login"}
								</Button>
							</CardFooter>
						</form>
					</Form>
					<div className="relative mb-2">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 m-6">
						<Button variant="outline">
							<FcGoogle className="mr-2 h-4 w-4" />
							Google
						</Button>
						<Button variant="outline">
							<FaGithub className="mr-2 h-4 w-4" />
							GitHub
						</Button>
					</div>

					<p className="mt-2 text-xs text-center text-gray-700 mb-4">
						{"Don't have an account? "}
						<span className=" text-blue-600 hover:underline">Sign up</span>
					</p>
				</Card>
			</div>
		</div >
	)
}