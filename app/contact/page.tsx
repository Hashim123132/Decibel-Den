'use client'

import { useState } from "react";
import emailjs from '@emailjs/browser';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      'service_whhpzdn',   // replace with your EmailJS service ID
      'template_qzltq75',  // replace with your EmailJS template ID
      {
      from_name: 'Decibel Den Website', // shows the source app
      user_name: name,
      user_email: email,
      message: message
    },
      'D8GfwGJ8JzQoUH5z0'    // replace with your EmailJS public key
    ).then(() => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }).catch((err) => {
      console.error('Failed to send email:', err);
    });
  }

   return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="mb-6 text-center">I&apos;d Love to hear from you!</p>


      {submitted && (
        <p className="bg-green-100 text-green-800 p-4 rounded mb-6 text-center">
          Thank you! Your message has been sent.
        </p>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 w-full max-w-md mx-auto"
      >
        <Input 
          placeholder="Name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <Input 
          type="email" 
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <Textarea
          placeholder="Message"
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required
          rows={6}
        />
        <Button className="cursor-pointer" type="submit" variant="default">Send Message</Button>
      </form>
    </div>
  )
}


export default ContactPage;
