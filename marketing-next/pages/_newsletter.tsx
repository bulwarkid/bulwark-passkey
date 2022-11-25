/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Newsletter() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="rounded-lg bg-indigo-700 px-6 py-6 md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
                    <div className="xl:w-0 xl:flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Want product news and updates?
                        </h2>
                        <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
                            Sign up for our newsletter to stay up to date.
                        </p>
                    </div>
                    <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
                        <form
                            className="sm:flex"
                            method="POST"
                            action="https://81ff763d.sibforms.com/serve/MUIEAL2aQM42tCOC7mbxRjBR-1pc3A-hz6ZiTI6v82pOpsDbkL_SIb3T1R19-57Lc7Xp1BxEHvtAfPh0uPCueGe7LOl1APt8_377k7_avHNw1YIxl5nnoMbaIKQO6meNKs4QxNpO3gLb2SIVR1Qrzg-wQnkj5A_kVTgGI0_ngmbTjf0L6XbqXKf4sLrKlbshm9f10GmMqsiah-LZ"
                        >
                            <label htmlFor="EMAIL" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="EMAIL"
                                name="EMAIL"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                                placeholder="Enter your email"
                                data-required="true"
                            />
                            <button
                                type="submit"
                                className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                            >
                                Notify me
                            </button>

                            <input
                                type="text"
                                name="email_address_check"
                                value=""
                                className="hidden"
                                readOnly
                            />
                            <input
                                type="hidden"
                                name="locale"
                                value="en"
                                readOnly
                            />
                            <input
                                type="hidden"
                                name="html_type"
                                value="simple"
                                readOnly
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
