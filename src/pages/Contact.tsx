import React from "react";
import ContactSection from "../components/Contact_section";

const Contact: React.FC = () => {
  return (
    <div className="max-w-[100vw] h-[90vh] overflow-hidden relative">
      <section className="text-gray-600 body-font h-full">
        <div className="absolute inset-0 bg-gray-300 h-full w-full">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex h-full items-center justify-center">
          <div className="lg:w-1/2 md:w-1/2 bg-white rounded-lg p-4 flex flex-col md:ml-auto w-full relative z-10 shadow-md">
            {/* Contact section */}
            <ContactSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
