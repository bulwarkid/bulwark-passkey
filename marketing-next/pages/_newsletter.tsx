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
                            />
                            <input type="hidden" name="locale" value="en" />
                            <input
                                type="hidden"
                                name="html_type"
                                value="simple"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// let blah = (<!-- Begin Sendinblue Form -->
//     <!-- START - We recommend to place the below code in head tag of your website html  -->
//     <style>
//       @font-face {
//         font-display: block;
//         font-family: Roboto;
//         src: url(https://assets.sendinblue.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.sendinblue.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff")
//       }

//       @font-face {
//         font-display: fallback;
//         font-family: Roboto;
//         font-weight: 600;
//         src: url(https://assets.sendinblue.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.sendinblue.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff")
//       }

//       @font-face {
//         font-display: fallback;
//         font-family: Roboto;
//         font-weight: 700;
//         src: url(https://assets.sendinblue.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.sendinblue.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff")
//       }

//       #sib-container input:-ms-input-placeholder {
//         text-align: left;
//         font-family: "Helvetica", sans-serif;
//         color: #c0ccda;
//       }

//       #sib-container input::placeholder {
//         text-align: left;
//         font-family: "Helvetica", sans-serif;
//         color: #c0ccda;
//       }
//     </style>
//     <link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">
//     <!--  END - We recommend to place the above code in head tag of your website html -->

//     <!-- START - We recommend to place the below code where you want the form in your website html  -->
//     <div class="sib-form" style="text-align: center;
//              background-color: #EFF2F7;                                           ">
//       <div id="sib-form-container" class="sib-form-container">
//         <div id="sib-container" class="sib-container--large sib-container--vertical" style="text-align:center; background-color:rgba(255,255,255,1); max-width:540px; border-radius:3px; border-width:1px; border-color:#C0CCD9; border-style:solid;">
//           <form id="sib-form" method="POST" action="https://81ff763d.sibforms.com/serve/MUIEAL2aQM42tCOC7mbxRjBR-1pc3A-hz6ZiTI6v82pOpsDbkL_SIb3T1R19-57Lc7Xp1BxEHvtAfPh0uPCueGe7LOl1APt8_377k7_avHNw1YIxl5nnoMbaIKQO6meNKs4QxNpO3gLb2SIVR1Qrzg-wQnkj5A_kVTgGI0_ngmbTjf0L6XbqXKf4sLrKlbshm9f10GmMqsiah-LZ">
//             <div style="padding: 8px 0;">
//               <div class="sib-form-block" style="font-size:32px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#3C4858; background-color:transparent;">
//                 <p>Newsletter</p>
//               </div>
//             </div>
//             <div style="padding: 8px 0;">
//               <div class="sib-form-block" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#3C4858; background-color:transparent;">
//                 <div class="sib-text-form-block">
//                   <p>Subscribe to our newsletter and stay updated.</p>
//                 </div>
//               </div>
//             </div>
//             <div style="padding: 8px 0;">
//               <div class="sib-input sib-form-block">
//                 <div class="form__entry entry_block">
//                   <div class="form__label-row ">
//                     <label class="entry__label" style="font-weight: 700; font-size:16px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#3c4858;" for="EMAIL" data-required="*">
//                       Enter your email address to subscribe
//                     </label>

//                     <div class="entry__field">
//                       <input class="input" type="text" id="EMAIL" name="EMAIL" autocomplete="off" placeholder="EMAIL" data-required="true" required />
//                     </div>
//                   </div>

//                   <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949;">
//                   </label>
//                   <label class="entry__specification" style="font-size:12px; text-align:left; font-family:&quot;Helvetica&quot;, sans-serif; color:#8390A4;">
//                     Provide your email address to subscribe. For e.g abc@xyz.com
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div style="padding: 8px 0;">
//               <div class="sib-form-block" style="text-align: left">
//                 <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-size:16px; text-align:left; font-weight:700; font-family:&quot;Helvetica&quot;, sans-serif; color:#FFFFFF; background-color:#3E4857; border-radius:3px; border-width:0px;" form="sib-form" type="submit">
//                   <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
//                     <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
//                   </svg>
//                   SUBSCRIBE
//                 </button>
//               </div>
//             </div>
//             <input type="text" name="email_address_check" value="" class="input--hidden">
//             <input type="hidden" name="locale" value="en">
//             <input type="hidden" name="html_type" value="simple">
//           </form>
//         </div>
//       </div>
//     </div>
//     <!-- END - We recommend to place the below code where you want the form in your website html  -->
//     <!-- End Sendinblue Form -->);
