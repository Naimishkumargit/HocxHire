import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | HocxHire</title>
        <meta
          name="description"
          content="Learn how HocxHire collects, uses, and protects your personal information. Our commitment to your privacy and data security."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <main style={{ maxWidth: "800px", margin: "auto", padding: "2rem", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h1>Privacy Policy</h1>

        <p>
          At <strong>HocxHire</strong>, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website and use our services.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect two types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Information you provide when applying for jobs or contacting us, such as your name, email address, resume, and other relevant details.</li>
          <li><strong>Automatically Collected Data:</strong> Details like your IP address, browser type, device information, and browsing behavior through cookies and tracking technologies.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and improve our recruitment services.</li>
          <li>Communicate with you about job applications, updates, and support.</li>
          <li>Analyze website usage to enhance user experience.</li>
          <li>Comply with legal and regulatory requirements.</li>
        </ul>

        <h2>Cookies and Tracking Technologies</h2>
        <p>
          Our website uses cookies and similar technologies to personalize content, analyze traffic, and serve targeted ads. You can control or disable cookies through your browser settings, but this may affect site functionality.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may share data with trusted third-party service providers such as Google Analytics and Google AdSense. These services have their own privacy policies which govern how they handle your data.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no internet transmission or storage method is 100% secure.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. To make such requests or for any privacy concerns, please contact us at <a href="mailto:contact@hocxhire.com">contact@hocxhire.com</a>.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We encourage you to review it regularly for any changes. Your continued use of HocxHire after updates means you accept the revised policy.
        </p>

        <p><em>Last updated: August 2025</em></p>
      </main>
    </>
  );
}