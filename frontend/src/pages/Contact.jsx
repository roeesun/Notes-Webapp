import "../styles/Layout.css";

function Contact() {
  return (
    <>
      <section>
        <address>
          <h2>Contact information</h2>
          <p>
            Email us:{" "}
            <a href="mailto:contact@contact.com">contact@contact.com</a>
          </p>
          <p>
            Call us: <a href="tel:012-345-6789">012-345-6789</a>
          </p>
        </address>
      </section>
    </>
  );
}

export default Contact;
