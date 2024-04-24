"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/actions/login";
import { startTransition, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";
import router from "next/router";

export default function Login() {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			login(values)
				.then((data) => {
					setError(data.error)
					setSuccess(data.success)
					if (!data.error) {
						router.push('/dashboard'); // Change '/dashboard' to your desired destination
					}
				})
		})
	};

	return (
		<div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
			<div className="w-full m-auto bg-white lg:max-w-lg">
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
						<CardDescription className="text-center">
							Login to TechHub for instant access to our learning community
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
														disabled={isPending}
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
														disabled={isPending}
														placeholder="••••••••••"
														type="password" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)} />
									<FormError message={error} />
									<FormSuccess message={success} />
								</div>
							</CardContent>
							<CardFooter className="flex flex-col">
								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending ? "Submitting..." : "Login"}
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
						{"New to TechHub? "}
						<Link className="text-blue-600 hover:underline" href="/register">
							Create an account
						</Link>
					</p>
				</Card>
			</div>
		</div >
	)
}