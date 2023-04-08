export default function ProblemWithPasskeys() {
    return (
        <div className="flex flex-col">
            <h2 className="text-4xl font-bold text-gray-900">
                The Problem with Passkeys
            </h2>
            <em className="pt-4 text-gray-500">
                Chris de la Iglesia - April 5 2022
            </em>
            <div className="flex flex-col space-y-6 mt-8">
                <p>
                    For those who aren't aware, passkeys are a brand new
                    industry standard for authentication. While passwords use a
                    basic, human-readable secret to authenticate with websites,
                    passkeys instead use public key encryption to authenticate,
                    thereby avoiding leakages (like phishing!) due to the entire
                    secret being copied into the browser to authenticate.
                    Instead of copying passwords, passkeys use an authenticator,
                    which is a device that stores the private keys and uses them
                    to authenticate challenges sent by the website through
                    mediums like WebAuthN.
                </p>
                <p>
                    Passkeys have gained a lot of support over the past year,
                    with Apple, Google, and Microsoft all adding support for
                    them to their various OS's. Initial website adoption has
                    been slow but steady, with some big names (Microsoft, Ebay)
                    adding website support for passkeys with WebAuthN.
                    Everything seems to be lining up for passkeys to be a major
                    new standard for user-level authentication on the web.
                </p>
                <p>
                    However, there is a core problem right now with passkeys, at
                    least with how the initial authenticators have been built.
                    Passkey authenticators have been based on 2FA authenticators
                    like Yubikey, or built-in private key management chips like
                    TPMs that are built into the laptop or phone. What this
                    means is that passkeys, as they are currently implemented,
                    are locked to the physical device and cannot be exported.
                    Right now the only way to use them to authenticate is to
                    either log in on the device itself or log in on a nearby
                    device using a short-distance communication protocol like
                    Bluetooth.
                </p>
                <p>
                    I think this is a major problem, and is in fact the biggest
                    obstacle to the mass adoption of passkeys. Passkeys have the
                    potential to completely replace passwords while also
                    removing the possibility of phishing attacks or secrets
                    being leaked from websites being hacked. They are a major
                    step forward in security, but they will only end up being
                    universal if they are also as flexible as passwords.
                </p>
                <p>
                    One major reason passwords have stuck around for so long is
                    their flexibility and universality. You can write your
                    passwords down, you can store them in a password manager,
                    you can export them from that manager, you can keep them in
                    your head, you can even write them down in a text file.
                    Granted, not all of these things are good, secure things to
                    do, but the fact that the user has so much control grants
                    passwords a level of trust that is absolutely necessary for
                    authentication. Nobody wants to be locked into a system
                    because the authenticator they initially used turned out to
                    be a dud. Ultimately, user control is not just a nice
                    feature for passkeys, but a necessary feature for their
                    adoption.
                </p>
                <p>
                    Now, companies like Microsoft, Google, and Apple have
                    eventually come to recognize this problem, and are
                    implementing ways to export your passkeys from your device.
                    However, even this new solution is still limiting, as their
                    authenticators still require passkeys to be locked to a
                    particular device, not stored and shared in a software
                    passkey manager like passwords. Passkeys under this system
                    are not as open and user-friendly as passwords, and that is
                    a major drawback.
                </p>
                <p>
                    What passkeys need to be successful is an open,
                    interoperable, and preferably open-source ecosystem where
                    users are allowed to control their own secrets and migrate
                    and manage them however they wish. In my opinion, the first
                    and most important step in that is to build a passkey
                    manager that is not tied to a hardware device and can be
                    used as freely as a password manager. This would give the
                    major security benefits of passkeys (such as avoiding
                    phishing) while still giving users the control they need to
                    trust the system.
                </p>
                <p>
                    This is what I am trying to build with Bulwark Passkey. It
                    is an open source passkey manager that emulates a USB
                    device, so it is compatible with all browsers. Right now it
                    is in beta and only supported on Windows and Linux (Mac
                    support is coming soon), but if you read this far and are
                    interested, please check it out!
                </p>
            </div>
        </div>
    );
}
