import Head from "next/head";
import Header from "../../content/header";
import Footer from "../../content/footer";
import Link from "next/link";

const posts = [
    {
        id: 1,
        title: "The Problem With Passkeys",
        href: "/blog/problem-with-passkeys",
        description:
            "Passkeys are a great solution to the security problems of passwords, but they require more open passkey manager to be useful.",
        date: "April 6, 2022",
        datetime: "2022-04-06",
        category: { title: "Development", href: "#" },
        author: {
            name: "Chris de la Iglesia",
            role: "Founder",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
];

export default function Blog() {
    return (
        <div>
            <Head>
                <title>Bulwark Passkey</title>
                <meta
                    name="description"
                    content="Software-based WebAuthN/2FA"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="relative">
                <Header />
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Blog
                            </h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Learn more about passkeys.
                            </p>
                            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                                {posts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="flex max-w-xl flex-col items-start justify-between"
                                    >
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time
                                                dateTime={post.datetime}
                                                className="text-gray-500"
                                            >
                                                {post.date}
                                            </time>
                                        </div>
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                <Link href={post.href}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                                {post.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12" />
                <Footer />
            </div>
        </div>
    );
}
