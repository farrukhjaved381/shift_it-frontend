import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, HelpCircle, FileText, Users, Building, Calendar } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Button = ({ variant = "default", children, className = "", ...props }) => {
  let classes = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-4 py-2";
  if (variant === "default") classes += " bg-blue-600 text-white hover:bg-blue-700";
  if (variant === "outline") classes += " border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100";
  return <button className={`${classes} ${className}`} {...props}>{children}</button>;
};

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

export default function ContactUsModule() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    priority: "normal",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Your message has been sent successfully! We'll get back to you within 24 hours.");
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      priority: "normal",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "(213) 740-2311",
      description: "Monday - Friday, 8:00 AM - 5:00 PM PST",
      action: "Call Now",
      onClick: () => window.location.href = "tel:2137402311",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@shiftit.usc.edu",
      description: "We typically respond within 24 hours",
      action: "Send Email",
      onClick: () => window.location.href = "mailto:support@shiftit.usc.edu",
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: "University of Southern California",
      description: "1975 Zonal Ave, Los Angeles, CA 90033",
      action: "Get Directions",
      onClick: () => window.open("https://maps.google.com/?q=1975+Zonal+Ave,+Los+Angeles,+CA+90033", "_blank"),
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      description: "8:00 AM - 5:00 PM PST",
      action: "View Calendar",
      onClick: () => alert("Viewing calendar..."),
    },
  ];

  const departments = [
    {
      icon: Users,
      name: "Student Affairs",
      email: "studentaffairs@shiftit.usc.edu",
      phone: "(213) 740-2311",
      description: "Student registration, academic support, and general inquiries",
    },
    {
      icon: FileText,
      name: "Document Review",
      email: "documents@shiftit.usc.edu",
      phone: "(213) 740-2312",
      description: "Document verification, compliance, and approval processes",
    },
    {
      icon: Calendar,
      name: "Clinical Coordination",
      email: "clinical@shiftit.usc.edu",
      phone: "(213) 740-2313",
      description: "Clinical rotation scheduling, site coordination, and placements",
    },
    {
      icon: Building,
      name: "IT Support",
      email: "itsupport@shiftit.usc.edu",
      phone: "(213) 740-2314",
      description: "Technical support, system access, and platform assistance",
    },
  ];

  const faqs = [
    {
      question: "How do I submit my clinical documents?",
      answer:
        "You can upload your documents through the Student Document Management section. Make sure all documents are clear, current, and meet the specified requirements.",
    },
    {
      question: "What should I do if my document is rejected?",
      answer:
        "If a document is rejected, you'll receive an email with the specific reason. Review the feedback, make necessary corrections, and resubmit through the portal.",
    },
    {
      question: "How are clinical rotation placements determined?",
      answer:
        "Placements are based on academic requirements, student preferences, availability at clinical sites, and prerequisite completion. Our clinical coordination team works to match students with appropriate sites.",
    },
    {
      question: "Who do I contact for technical issues?",
      answer:
        "For any technical problems with the platform, contact our IT Support team at itsupport@shiftit.usc.edu or call (213) 740-2314.",
    },
    {
      question: "How long does document review take?",
      answer:
        "Document review typically takes 3-5 business days. Urgent documents may be expedited upon request. You'll receive email notifications about the status of your submissions.",
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-lg text-gray-600">We're here to help! Reach out to us with any questions or concerns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactInfo.map((info, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <info.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
              <p className="font-medium text-gray-900 mb-1">{info.details}</p>
              <p className="text-sm text-gray-600 mb-4">{info.description}</p>
              <Button variant="outline" className="w-full" onClick={info.onClick}>
                {info.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={contactForm.category}
                    onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="documents">Document Issues</option>
                    <option value="clinical">Clinical Rotations</option>
                    <option value="account">Account Issues</option>
                    <option value="billing">Billing Questions</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="Enter message subject"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Please describe your question or issue in detail..."
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Department Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <dept.icon className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <a href={`mailto:${dept.email}`} className="text-blue-600 hover:underline">
                            {dept.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <a href={`tel:${dept.phone.replace(/\D/g, "")}`} className="hover:underline">
                            {dept.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Phone className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Emergency Contact</h3>
              <p className="text-red-700">
                For urgent clinical or safety issues outside business hours, call: <strong>(213) 740-9999</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}