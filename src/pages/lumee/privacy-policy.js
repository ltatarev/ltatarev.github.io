import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="ease m-auto mb-20 flex min-w-min max-w-screen-xl flex-col items-start p-10 transition-all duration-75">
      <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
      <div className="prose max-w-none">
        <div>
          <p>
            <strong>Last Updated:</strong> 20.12.2025.
          </p>
          <p>
            <strong>App:</strong> Lumee
          </p>
          <p>
            <strong>Contact:</strong> brief-fennecs8a@icloud.com
          </p>

          <p>
            Lumee (“the App”) is an iOS application. Your privacy is important
            to us. This Privacy Policy explains what information we collect, how
            we use it, and your rights regarding your data.
          </p>

          <h2 className="bold">1. Information We Collect</h2>
          <p>
            Lumee does not require users to create an account and does not
            directly collect personally identifiable information such as your
            name, email address, or precise location.
          </p>

          <h3 className="bold">a) Usage Data</h3>
          <p>
            We use Amplitude to understand how users interact with the App. This
            may include:
          </p>
          <ul>
            <li>App interactions (such as screens viewed or features used)</li>
            <li>Device information (device type, operating system version)</li>
            <li>General usage patterns</li>
          </ul>
          <p>
            This data is aggregated and does not directly identify individual
            users.
          </p>

          <h3 className="bold">b) Crash and Error Data</h3>
          <p>
            We use Sentry to monitor app crashes and technical issues. This may
            include:
          </p>
          <ul>
            <li>Crash logs</li>
            <li>Device and system information at the time of a crash</li>
            <li>App version and performance data</li>
          </ul>
          <p>
            This information is used solely to improve app stability and
            performance.
          </p>

          <h2 className="bold">2. Ih2App Purchases</h2>
          <p>
            Lumee offers optional in-app purchases. Payments are processed
            securely by Apple through the App Store. We do not collect or store
            payment information.
          </p>

          <h2 className="bold">3. How We h2e Information</h2>
          <p>The information we collect is used only to:</p>
          <ul>
            <li>Improve app functionality and user experience</li>
            <li>Monitor performance and stability</li>
            <li>Fix bugs and technical issues</li>
          </ul>
          <p>
            We do not sell, rent, or share your data for advertising purposes.
          </p>

          <h2 className="bold">4. Thirdh2arty Services</h2>
          <p>
            Lumee uses third-party services that may collect data according to
            their own privacy policies:
          </p>
          <ul>
            <li>Amplitude (Analytics)</li>
            <li>Sentry (Crash reporting)</li>
          </ul>

          <h2 className="bold">5.h2ata Retention</h2>
          <p>
            We retain analytics and crash data only for as long as necessary to
            fulfill the purposes described in this policy or as required by law.
          </p>

          <h2 className="bold">6. Chih2ren’s Privacy</h2>
          <p>
            Lumee is intended for adults only and is not designed for use by
            children under the age of 13. We do not knowingly collect personal
            data from children.
          </p>

          <h2 className="bold">7. Youh2Rights (GDPR)</h2>
          <p>
            If you are located in the European Union, you have the right to:
          </p>
          <ul>
            <li>Access data related to you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to or restrict certain data processing</li>
          </ul>
          <p>
            To exercise these rights, contact us using the email address above.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted with an updated “Last Updated” date.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Head() {
  return (
    <>
      <title>Privacy Policy - Lumee</title>
      <meta charSet="utf-8" />
      <meta content="index,follow" name="robots" />
    </>
  );
}
