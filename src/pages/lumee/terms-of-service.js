import React from 'react';
import { Link } from 'gatsby';

export default function TermsOfServicePage() {
  return (
    <div className="ease m-auto mb-20 flex min-w-min max-w-screen-xl flex-col items-start p-10 transition-all duration-75">
      <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>
      <div className="prose max-w-none">
        <div>
          <h1>Terms of Service (End User License Agreement)</h1>

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
            By downloading, installing, or using Lumee (“the App”), you agree to
            be bound by the terms of this End User License Agreement
            (“Agreement”). If you do not agree with these terms, do not install
            or use the App.
          </p>

          <h2>1. License</h2>
          <p>
            The App is licensed, not sold, to you for use strictly in accordance
            with this Agreement. This license is personal, non-exclusive,
            non-transferable, and limited to use on Apple devices that you own
            or control, as permitted by the App Store Terms of Service.
          </p>

          <h2>2. Scope of Use</h2>
          <p>You may:</p>
          <ul>
            <li>Use the App on your compatible iOS device.</li>
            <li>Access features and content provided within the App.</li>
          </ul>

          <p>You may not:</p>
          <ul>
            <li>Reverse-engineer, decompile, or disassemble the App.</li>
            <li>Modify or create derivative works.</li>
            <li>Distribute or transfer the App to others.</li>
            <li>Use the App on devices you do not own or control.</li>
          </ul>

          <h2>3. Consent to Data Collection</h2>
          <p>
            By using the App, you consent to the collection of limited,
            non-personal data for analytics and crash reporting purposes. This
            may include device information, usage patterns, and performance
            data. Details are described in the Privacy Policy.
          </p>

          <h2>4. In-App Purchases</h2>
          <p>
            The App may offer optional in-app purchases. Payments are processed
            by Apple through the App Store. We do not collect or store payment
            information. Refunds and billing matters are handled according to
            Apple’s policies.
          </p>

          <h2>5. Maintenance and Support</h2>
          <p>
            The developer is solely responsible for providing maintenance and
            support for the App, except where required by applicable law.
          </p>

          <h2>6. Termination</h2>
          <p>
            This Agreement remains in effect until terminated. Your rights under
            this Agreement will terminate automatically if you fail to comply
            with any term. Upon termination, you must stop using the App and
            delete it from your devices.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            The App may use third-party services such as analytics or crash
            reporting tools. Your use of those services may be subject to their
            respective terms and policies.
          </p>

          <h2>8. Warranty Disclaimer</h2>
          <p>
            The App is provided “AS IS” and “AS AVAILABLE” without warranties of
            any kind, whether express or implied, including merchantability or
            fitness for a particular purpose.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, the developer shall not be
            liable for any indirect, incidental, or consequential damages
            arising out of or related to your use of the App.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            This Agreement shall be governed by and interpreted in accordance
            with the laws of the applicable jurisdiction, excluding conflict of
            law rules.
          </p>

          <h2>11. Changes to This Agreement</h2>
          <p>
            We may update this Agreement from time to time. Continued use of the
            App after changes are posted constitutes acceptance of the updated
            terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Head() {
  return (
    <>
      <title>Terms of Service - Lumee</title>
      <meta charSet="utf-8" />
      <meta content="index,follow" name="robots" />
    </>
  );
}
