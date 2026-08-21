import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Github, Linkedin, Youtube, Rocket, Flame, CheckCircle2, MessageSquare, X } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-80px 0px" });
  const [showFormModal, setShowFormModal] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || isLaunching) return;

    setIsLaunching(true);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      fetch(`https://formsubmit.co/quantfinance@coeptech.ac.in`, {
        method: "POST",
        body: formData,
      }).catch((err) => console.error("Form submit warning:", err));

      setTimeout(() => {
        setSubmitted(true);
        setIsLaunching(false);
      }, 1000);

      setTimeout(() => {
        navigate("/thank-you");
      }, 1900);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
      setIsLaunching(false);
    }
  };

  const svgBgUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' xml:space='preserve'%3E%3Cstyle%3E .st2%7Bfill:%23231f20%7D.st23%7Bfill:%2350627d%7D.st24%7Bfill:%23415166%7D.st25%7Bfill:%2392ada8%7D.st28%7Bfill:%23534741%7D.st29%7Bfill:%235b5043%7D.st30%7Bfill:%2382b6cb%7D.st31%7Bfill:%237aa9bf%7D.st32%7Bfill:%23fff%7D.st33%7Bfill:%239abe2a%7D.st35%7Bfill:%23fc931d%7D.st36%7Bfill:%23013938%7D.st37%7Bfill:%23954b02%7D.st38%7Bfill:%23f6c61c%7D.st39%7Bfill:%23ee6136%7D.st40%7Bfill:%23d4effb%7D.st41%7Bfill:%23fefcf2%7D.st42%7Bfill:%2397a0b8%7D.st46%7Bfill:%23bd9b65%7D.st47%7Bfill:%23bae532%7D.st48%7Bfill:%232a9d4b%7D.st49%7Bfill:%235f4325%7D.st50%7Bfill:%231d4b1f%7D.st53%7Bfill:%232ab54b%7D %3C/style%3E%3Cg id='Objects'%3E%3Cg id='elements'%3E%3Cpath class='st23' d='m601.1 443.7 5-124.6h12.5l7 124.6z'/%3E%3Cpath class='st24' d='M613.4 443.7h12.2l-7-124.6h-5.2z'/%3E%3Ccircle class='st25' cx='582.8' cy='277.1' r='19.2'/%3E%3Ccircle class='st25' cx='556.4' cy='283.1' r='12'/%3E%3Ccircle class='st25' cx='567.7' cy='290.6' r='6.3'/%3E%3Ccircle class='st25' cx='542.2' cy='282.4' r='9.3'/%3E%3Ccircle class='st25' cx='528.3' cy='281.1' r='9.2'/%3E%3Ccircle class='st25' cx='553' cy='287.3' r='2.9'/%3E%3Ccircle class='st25' cx='594.6' cy='292.2' r='6.4'/%3E%3Ccircle class='st25' cx='600.6' cy='296.9' r='3.5'/%3E%3Ccircle class='st25' cx='605.7' cy='296.5' r='6.4'/%3E%3Ccircle class='st25' cx='601' cy='290.6' r='8'/%3E%3Ccircle class='st25' cx='608.9' cy='302.5' r='4.7'/%3E%3Ccircle class='st25' cx='610.8' cy='307.3' r='4.1'/%3E%3Ccircle class='st25' cx='611.9' cy='311.4' r='3.5'/%3E%3Ccircle class='st25' cx='613.1' cy='316.4' r='3.3'/%3E%3Cpath class='st24' d='M689.1 381.2h13v60h-13v-60zm11.9 1.2h-10.7v57.7H701v-57.7z'/%3E%3Cpath class='st24' d='M689.7 441.3h11.9c.3 0 .6-.2.6-.5.1-.3 0-.6-.3-.8l-10-6.5h9.6c.3 0 .5-.2.6-.5.1-.3 0-.6-.2-.7l-10.2-7.7h9.8c.3 0 .6-.2.6-.5.1-.3 0-.6-.3-.8l-10.1-6.8h9.7c.3 0 .6-.2.6-.5.1-.3 0-.6-.3-.7l-10.1-7.2h9.8c.3 0 .6-.2.6-.5.1-.3 0-.6-.3-.8l-10.1-7.2h9.8c.3 0 .5-.2.6-.5.1-.3 0-.6-.2-.7l-10.2-7.7h9.8c.3 0 .5-.2.6-.5.1-.3 0-.6-.2-.7l-11.9-8.5c-.3-.2-.7-.1-.9.2-.2.3-.1.7.2.9l10.2 7.3h-9.8c-.3 0-.5.2-.6.5-.1.3 0 .6.2.7l10.2 7.7h-9.8c-.3 0-.5.2-.6.5-.1.3 0 .6.3.8l10.1 7.2h-9.8c-.3 0-.5.2-.6.5-.1.3 0 .6.3.7l10.1 7.2h-9.8c-.3 0-.6.2-.6.5-.1.3 0 .6.3.8l10.1 6.8h-9.7c-.3 0-.5.2-.6.5-.1.3 0 .6.2.7l10.2 7.7h-9.8c-.3 0-.6.2-.6.5-.1.3 0 .6.3.8l10 6.5h-9.6c-.4 0-.7.3-.7.7-.1.3.2.6.6.6z'/%3E%3Cpath class='st24' d='M637.5 368.7H742v13.4H637.5v-13.4zm102.9 1.6H639v10.3h101.4v-10.3z'/%3E%3Cpath class='st24' d='M706.5 382.1c.2 0 .4-.1.6-.3l9-10.3v9.8c0 .3.2.6.5.7.3.1.6.1.8-.1l11.4-10.6v10.1c0 .3.2.6.5.7.3.1.6 0 .8-.2l11.6-11.9c.3-.3.3-.8 0-1.1-.3-.3-.8-.3-1.1 0l-10.3 10.5v-10c0-.3-.2-.6-.5-.7-.3-.1-.6-.1-.8.1l-11.4 10.6v-10.1c0-.3-.2-.6-.5-.7-.3-.1-.6 0-.9.2l-9 10.3v-9.8c0-.3-.2-.6-.5-.7-.3-.1-.6-.1-.8.2l-10.5 10.5v-10c0-.3-.2-.6-.5-.7-.3-.1-.6 0-.9.2l-9.4 10.4v-9.9c0-.3-.2-.6-.5-.7-.3-.1-.6 0-.8.2l-9.9 10.4v-9.9c0-.3-.2-.6-.5-.7-.3-.1-.6 0-.8.2l-9.9 10.4v-9.9c0-.3-.2-.6-.5-.7-.3-.1-.6-.1-.8.2l-10.5 10.5v-10c0-.3-.2-.6-.5-.7-.3-.1-.6 0-.8.2l-11.4 11.9c-.3.3-.3.8 0 1.1.3.3.8.3 1.1 0l10.1-10.5v9.9c0 .3.2.6.5.7.3.1.6.1.8-.2l10.5-10.5v10c0 .3.2.6.5.7.3.1.6 0 .8-.2l9.9-10.4v9.9c0 .3.2.6.5.7.3.1.6 0 .8-.2l9.9-10.4v9.9c0 .3.2.6.5.7.3.1.6 0 .9-.2l9.4-10.4v9.9c0 .3.2.6.5.7.3.1.6.1.8-.2l10.5-10.5v10c0 .3.2.6.5.7.1.2.2.2.3.2z'/%3E%3Cpath class='st24' d='m672.6 370.1 24.9-12.7 20.8 12.7.7-1.2-21.4-13.1-25.6 13.1z'/%3E%3Cpath fill='%23f35024' d='M714.8 381.8h-43.1l25.9-29.2 17.2 28.8'/%3E%3Cpath fill='%23367c6b' d='M512.2 485.9h65.2l18.7-18.6H651l26.7 43.1h88v-49.6H537z'/%3E%3Cpath class='st28' d='M543.1 377.9h88.1v63.9h-88.1z'/%3E%3Cpath class='st29' d='M608.4 387.1h14.5v10.4h-14.5zM589.3 387.1h14.5v10.4h-14.5zM570.2 387.1h14.5v10.4h-14.5zM551.1 387.1h14.5v10.4h-14.5z'/%3E%3Cpath class='st28' d='M631.2 377.9v-16.8l-25 16.8v-16.8l-21 16.8v-16.8l-21 16.8v-16.8l-20.9 16.8'/%3E%3Cpath class='st30' d='m55.6 432.8 140.8-273.5 149.1 273.5z'/%3E%3Cpath class='st31' d='M345.5 432.8 196.4 159.3v273.5z'/%3E%3Cpath class='st32' d='m153.6 242.4 18.6-8.5-3.8 32.2 19.3-24.7 8.7 43.9 15.9-52.3 36.6 22.7-11.2-20.7-41.3-75.7z'/%3E%3Cpath class='st30' d='M247.1 432.8 380.3 222l141 210.8z'/%3E%3Cpath class='st31' d='M521.3 432.8 380.3 222v210.8z'/%3E%3Cpath class='st32' d='m339.8 286.1 17.6-6.6-3.6 24.8 18.2-19 8.3 33.8 15-40.3 34.7 17.5-10.7-16-39-58.3z'/%3E%3Cpath class='st33' d='M730.4 451.3c0 5.2-4.2 9.5-9.5 9.5H23.5c-5.2 0-9.5-4.2-9.5-9.5 0-5.2 4.2-9.5 9.5-9.5h697.4c5.2 0 9.5 4.3 9.5 9.5z'/%3E%3Cpath fill='%23f7ba5d' d='M316.2 426.2H285v-24.7l15.6-11.9 15.6 11.9z'/%3E%3Cpath class='st35' d='M290.2 401h17.9v10.2h-17.9z'/%3E%3Cpath class='st36' d='M300.3 402.3h6.2v7.6h-6.2zM292 402.3h6.2v7.6H292z'/%3E%3Cpath class='st37' d='M317.7 402.7c-.6 0-1.2-.2-1.7-.6l-15.4-11.7-15.4 11.7c-1.2.9-3 .7-3.9-.5-.9-1.2-.7-3 .5-3.9l17.1-13c1-.8 2.4-.8 3.4 0l17.1 13c1.2.9 1.5 2.7.5 3.9-.5.7-1.4 1.1-2.2 1.1z'/%3E%3Cpath class='st37' d='M311.9 386.6h4.4v9.5h-4.4z'/%3E%3Cpath class='st37' d='M311.5 385h5.2v1.8h-5.2z'/%3E%3Cg%3E%3Cpath class='st38' d='M198.8 358.4h-28v-22.1l14-10.7 14 10.7z'/%3E%3Cpath class='st35' d='M175.5 335.8h16v9.1h-16z'/%3E%3Cpath class='st36' d='M184.5 337h5.5v6.8h-5.5zM177 337h5.5v6.8H177z'/%3E%3Cpath class='st39' d='M200.1 337.3c-.5 0-1.1-.2-1.5-.5l-13.8-10.5-13.8 10.5c-1.1.8-2.7.6-3.5-.5-.8-1.1-.6-2.7.5-3.5l15.3-11.6c.9-.7 2.1-.7 3 0l15.3 11.6c1.1.8 1.3 2.4.5 3.5-.5.7-1.3 1-2 1z'/%3E%3Cpath class='st39' d='M194.9 322.9h3.9v8.5h-3.9z'/%3E%3Cpath class='st39' d='M194.5 321.5h4.7v1.6h-4.7z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st40' d='M191.7 49.2h-.2c-1.7-14.3-13.9-25.5-28.8-25.5-16 0-29 13-29 29v.5c-1.1-.3-2.3-.5-3.6-.5-7.6 0-13.8 5.7-14.7 13-1.8-.6-3.8-1-5.8-1-9.8 0-17.7 7.9-17.7 17.7 0 9.8 7.9 17.7 17.7 17.7h82c14.1 0 25.5-11.4 25.5-25.5s-11.3-25.4-25.4-25.4z'/%3E%3Cpath class='st41' d='M104.7 89.8c2 0 4 .4 5.8 1 .9-7.3 7.1-13 14.7-13 1.2 0 2.4.2 3.6.5v-.5c0-16 13-29 29-29 14.8 0 27 11.1 28.8 25.5h.2c11.2 0 20.7 7.2 24.1 17.3 4-4.5 6.4-10.4 6.4-16.8 0-14.1-11.4-25.5-25.5-25.5h-.2c-1.7-14.3-13.9-25.5-28.8-25.5-16 0-29 13-29 29v.5c-1.1-.3-2.3-.5-3.6-.5-7.6 0-13.8 5.7-14.7 13-1.8-.6-3.8-1-5.8-1-9.8 0-17.7 7.9-17.7 17.7 0 3.8 1.2 7.2 3.2 10.1 2.7-1.8 6-2.8 9.5-2.8z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st40' d='M409.3 97.8h-.2c-1.7-14.3-13.9-25.5-28.8-25.5-16 0-29 13-29 29v.5c-1.1-.3-2.3-.5-3.6-.5-7.6 0-13.8 5.7-14.7 13-1.8-.6-3.8-1-5.8-1-9.8 0-17.7 7.9-17.7 17.7 0 9.8 7.9 17.7 17.7 17.7h82c14.1 0 25.5-11.4 25.5-25.5.1-14-11.3-25.4-25.4-25.4z'/%3E%3Cpath class='st41' d='M322.3 138.4c2 0 4 .4 5.8 1 .9-7.3 7.1-13 14.7-13 1.2 0 2.4.2 3.6.5v-.5c0-16 13-29 29-29 14.8 0 27 11.1 28.8 25.5h.2c11.2 0 20.7 7.2 24.1 17.3 4-4.5 6.4-10.4 6.4-16.8 0-14.1-11.4-25.5-25.5-25.5h-.2c-1.7-14.3-13.9-25.5-28.8-25.5-16 0-29 13-29 29v.5c-1.1-.3-2.3-.5-3.6-.5-7.6 0-13.8 5.7-14.7 13-1.8-.6-3.8-1-5.8-1-9.8 0-17.7 7.9-17.7 17.7 0 3.8 1.2 7.2 3.2 10.1 2.8-1.8 6-2.8 9.5-2.8z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st23' d='m523.8 441.8 8.1-153h20.5l11.5 153z'/%3E%3Cpath class='st24' d='M543.8 441.8h20.1l-11.5-153h-8.6z'/%3E%3C/g%3E%3Cg%3E%3Ccircle class='st42' cx='499' cy='233.1' r='24.8'/%3E%3Ccircle class='st42' cx='464.8' cy='241' r='15.5'/%3E%3Ccircle class='st42' cx='479.4' cy='250.6' r='8.2'/%3E%3Ccircle class='st42' cx='446.4' cy='240.1' r='12.1'/%3E%3Ccircle class='st42' cx='428.4' cy='238.3' r='11.9'/%3E%3Ccircle class='st42' cx='460.3' cy='246.4' r='3.8'/%3E%3Ccircle class='st42' cx='514.2' cy='252.7' r='8.3'/%3E%3Ccircle class='st42' cx='522' cy='258.9' r='4.6'/%3E%3Ccircle class='st42' cx='528.6' cy='258.3' r='8.3'/%3E%3Ccircle class='st42' cx='522.5' cy='250.6' r='10.4'/%3E%3Ccircle class='st42' cx='532.8' cy='266.1' r='6.1'/%3E%3Ccircle class='st42' cx='535.3' cy='272.2' r='5.3'/%3E%3Ccircle class='st42' cx='536.7' cy='277.6' r='4.5'/%3E%3Ccircle class='st42' cx='538.2' cy='284' r='4.3'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st23' d='M671.6 441.8v-35.6c0-11-9-20-20-20H643c-11 0-20 9-20 20v35.6h48.6z'/%3E%3Cpath class='st24' d='M651.6 386.2h-4.3v55.6h24.3v-35.6c0-11-8.9-20-20-20z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st23' d='M689.7 441.8v-26.4c0-8.2-6.7-14.9-14.9-14.9h-6.4c-8.2 0-14.9 6.7-14.9 14.9v26.4h36.2z'/%3E%3Cpath class='st24' d='M674.8 400.5h-3.2v41.3h18.1v-26.4c0-8.2-6.6-14.9-14.9-14.9z'/%3E%3C/g%3E%3Cpath fill='%23448573' d='M738.1 464.4H761v38.4h-71.3l-26-38.4z'/%3E%3Cg%3E%3Cpath d='M738.1 472.4h-17.4c-4.3 0-7.8-1.1-10.3-3.2-2.4-2-3.8-4.9-3.8-8.2 0-6.4 5.4-13.2 13.6-13.2 1.4 0 2.5-.3 3.1-1 .5-.5.8-1.1.8-1.8 0-1.4-1-2.8-3.9-2.8h-30.5v-8h30.5c7.8 0 11.9 5.4 11.9 10.8 0 2.9-1.1 5.5-3.2 7.5-1.5 1.5-4.3 3.3-8.7 3.3-3.4 0-5.6 3-5.6 5.2 0 .8.3 1.5.9 2 1 .8 2.8 1.3 5.1 1.3H738v8.1z' fill='%2351637f'/%3E%3Cpath class='st24' d='M715.6 467.1c-.6-.5-.9-1.2-.9-2 0-.7.2-1.5.6-2.3-.4-.5-.6-1-.6-1.8 0-2.2 2.1-5.2 5.6-5.2 4.4 0 7.2-1.8 8.7-3.3 1.6-1.5 2.6-3.4 3-5.5-.9-4.6-4.9-8.8-11.7-8.8h-30.5v4h30.5c2.9 0 3.9 1.4 3.9 2.8 0 .7-.3 1.3-.8 1.8-.1.1-.2.1-.3.2.7.5 1 1.3 1 2s-.3 1.3-.8 1.8c-.7.7-1.7 1-3.1 1-7.3 0-12.4 5.5-13.4 11.2.4 2.4 1.7 4.6 3.6 6.2 2.5 2.1 6 3.2 10.3 3.2h17.4v-4h-17.4c-2.3 0-4.1-.5-5.1-1.3z'/%3E%3C/g%3E%3Cpath fill='%2392724f' d='m31.1 461.2 165.3 66.1 67.6-31.7 108.2 67.7 58.6-64.1H499l38-38.4z'/%3E%3Cg%3E%3Cpath class='st46' d='m181.2 495.6-29.5 13.9 44.7 17.8 20.3-9.5zM454.1 460.8l-38 38.4h-68.2l-28.4 31.1 52.7 33 58.6-64.1H499l38-38.4z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st24' d='M502.4 442.3c-.2 0-.3 0-.5-.1-.3-.2-.6-.6-.5-1l2.8-38.3v-.1l3.5-47.1 2 .1-3.3 45.2 21-13.5 1.1 1.7-21.3 13.8 24.7 14.9c.3.2.5.5.5.8 0 .3-.1.6-.4.8l-28.9 22.6c-.2.2-.4.2-.7.2zm3.8-37.6-2.6 34.5 26-20.3-23.4-14.2z'/%3E%3Cpath class='st24' d='M533.2 442.2 503.4 421l.1-1.7 24.5-15.2-22.1-17.4v-1.5l17.3-14.9-15.2-9.4 1-1.7 15.9 9.8-1.4-13 2-.2 9.4 85.5-1.7.9zm-27.4-22 26.8 19.1-3.7-33.3-23.1 14.2zm2.3-34.4 20.4 16.1-3.4-30.7-17 14.6z'/%3E%3Cpath class='st24' d='M527.4 389.2 506 371.7l18.2-13.6 1.2 1.6-16.2 12.1 19.5 15.9z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st47' d='M22 441.8s49.2-12.6 74.2-35.6c33.9-31.2 51.9-56.2 88.5-56.2 41.4 0 99.8 85.7 162.8 91.8H22z'/%3E%3Cpath class='st33' d='M225.7 441.8h121.8c-62.9-6.1-121.3-91.8-162.8-91.8-17.9 0-31.4 6-44.4 15.8 32.5 8.9 76 52.7 85.4 76z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st47' d='M247.7 441.8s50.4-12.5 76.1-35.3c34.7-30.9 53.2-55.7 90.7-55.7 42.4 0 102.3 84.9 166.8 91H247.7z'/%3E%3Cpath class='st33' d='M456.4 441.8h124.8c-64.5-6.1-124.3-91-166.8-91-18.3 0-32.1 5.9-45.5 15.6 33.2 9 77.9 52.3 87.5 75.4z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st48' d='M376 399.4h22.6l-12.1-29z'/%3E%3Cpath class='st49' d='M384.6 399.4h3.7v3h-3.7z'/%3E%3Cpath class='st50' d='M386.5 399.4h12.1l-12.1-29z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st48' d='M459.9 434.9h22.5l-12-29z'/%3E%3Cpath class='st49' d='M468.5 434.9h3.7v3h-3.7z'/%3E%3Cpath class='st50' d='M470.4 434.9h12l-12-29z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st48' d='M147.3 415.4h22.6l-12.1-29z'/%3E%3Cpath class='st49' d='M155.9 415.4h3.7v3h-3.7z'/%3E%3Cpath class='st50' d='M157.8 415.4h12.1l-12.1-29z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st48' d='M144.6 363h22.6l-12.1-29z'/%3E%3Cpath class='st49' d='M153.3 363h3.7v3h-3.7z'/%3E%3Cpath class='st50' d='M155.1 363h12.1l-12.1-29z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st48' d='M227.5 421.5h22.6l-12.1-29z'/%3E%3Cpath class='st49' d='M236.2 421.5h3.7v3h-3.7z'/%3E%3Cpath class='st50' d='M238 421.5h12.1l-12.1-29z'/%3E%3C/g%3E%3Cg%3E%3Cpath fill='%23e9e5e7' d='M420.1 359.8h-27.9v-22l14-10.7 13.9 10.7z'/%3E%3Cpath fill='%23794819' d='M405.3 340h8.9v16h-8.9z'/%3E%3Cpath class='st36' d='M407.2 342h5.5v11.9h-5.5zM397 342h5.5v5.5H397z'/%3E%3Cpath class='st37' d='M421.4 338.8c-.5 0-1.1-.2-1.5-.5h-27.6c-1.1.8-2.7.6-3.5-.5-.8-1.1-.6-2.7.5-3.5l15.3-11.6c.9-.7 2.1-.7 3 0l15.3 11.6c1.1.8 1.3 2.4.5 3.5-.5.6-1.2 1-2 1z'/%3E%3Cpath class='st37' d='M416.2 324.4h3.9v8.5h-3.9z'/%3E%3Cpath class='st37' d='M415.9 323h4.7v1.6h-4.7z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st48' d='M412.9 372.8h27.4l-14.7-38z'/%3E%3Cpath class='st49' d='M423.4 372.8h4.5v3.9h-4.5z'/%3E%3Cpath class='st50' d='M425.6 372.8h14.7l-14.7-38z'/%3E%3C/g%3E%3Cg%3E%3Ccircle class='st53' cx='363' cy='354.3' r='15.5'/%3E%3Cpath class='st49' d='m362 383.4.1-16.7-7.4-8.8 7.3 6.1 1.1-7 1.4 7.5 8.2-5.9-8.2 8.1-.1 16.7z'/%3E%3C/g%3E%3Cg%3E%3Ccircle class='st53' cx='250.1' cy='372.5' r='15.5'/%3E%3Cpath class='st49' d='m249.1 401.6.1-16.7-7.5-8.8 7.4 6.1 1.1-6.9 1.4 7.4 8.2-5.9-8.2 8.1-.1 16.7z'/%3E%3C/g%3E%3Cg%3E%3Ccircle class='st53' cx='99.1' cy='392.2' r='15.5'/%3E%3Cpath class='st49' d='m98.1 421.2.1-16.7-7.5-8.8 7.4 6.1 1.1-6.9 1.4 7.4 8.2-5.9-8.2 8.1-.1 16.7z'/%3E%3C/g%3E%3Cg%3E%3Ccircle class='st38' cx='612.2' cy='105.8' r='30.4'/%3E%3Cpath d='M642.6 105.8c0-16.8-13.6-30.4-30.4-30.4v60.8c16.8 0 30.4-13.6 30.4-30.4z' fill='%23f6e31c'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st37' d='M443.9 425.2c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .6.5 1 1 1zM449.1 414.9c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .5.5 1 1 1zM445.5 401.8c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .6.4 1 1 1zM434 423.9c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .6.4 1 1 1zM426 419.7c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .5.4 1 1 1zM414.3 419.7c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .5.4 1 1 1zM403.4 423.9c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .6.5 1 1 1zM391.1 419.7c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .5.5 1 1 1zM381.2 418.4c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .5.4 1 1 1zM370.8 419.7c.6 0 1-.4 1-1v-11.1c0-.6-.4-1-1-1s-1 .4-1 1v11.1c0 .5.4 1 1 1z'/%3E%3Cg%3E%3Cpath class='st37' d='M444.5 419.7c.2 0 .4-.1.5-.3l4.7-10c0-.1.1-.2 0-.3l-3.7-15.4c-.1-.3-.3-.4-.6-.4-.3.1-.4.3-.4.6l3.6 15.2-4.4 9.5-10-1.8-7.9-4.2c-.1 0-.2-.1-.2-.1h-11.4l-11.3 2.9-12-4.2h-10.2l-10.4 1.3c-.3 0-.5.3-.4.6 0 .3.3.5.6.4l10.4-1.3h9.8l12.1 4.2h.3l11.4-2.9h11.1l7.9 4.2h.1l10.4 2c-.1 0-.1 0 0 0z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cpath class='st37' d='M95.7 436.6c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1v11.1c0 .5-.4 1-1 1zM90.5 426.2c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1v11.1c0 .6-.4 1-1 1zM94.2 413.2c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1v11.1c0 .5-.5 1-1 1zM105.7 435.2c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1v11.1c0 .6-.5 1-1 1zM113.7 431c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1V430c0 .6-.5 1-1 1zM125.3 431c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1V430c0 .6-.4 1-1 1zM136.2 435.2c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1v11.1c0 .6-.4 1-1 1zM148.5 431c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1V430c0 .6-.4 1-1 1zM158.5 429.7c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1v11.1c0 .5-.5 1-1 1zM168.9 431c-.6 0-1-.4-1-1v-11.1c0-.6.4-1 1-1s1 .4 1 1V430c0 .6-.5 1-1 1z'/%3E%3Cg%3E%3Cpath class='st37' d='M95.2 431c-.2 0-.4-.1-.5-.3l-4.7-10c0-.1-.1-.2 0-.3l3.7-15.4c.1-.3.3-.4.6-.4.3.1.4.3.4.6L91 420.5l4.4 9.5 10-1.8 7.9-4.2c.1 0 .2-.1.2-.1h11.4l11.3 2.9 12-4.2h10.2l10.4 1.3c.3 0 .5.3.4.6 0 .3-.3.5-.6.4l-10.4-1.3h-9.8l-12.1 4.2h-.3l-11.4-2.9h-11.1l-7.9 4.2h-.1L95.2 431z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cpath class='st40' d='M695.5 93.1h-.2c-1.7-14.3-13.9-25.5-28.8-25.5-16 0-29 13-29 29v.5c-1.1-.3-2.3-.5-3.6-.5-7.6 0-13.8 5.7-14.7 13-1.8-.6-3.8-1-5.8-1-9.8 0-17.7 7.9-17.7 17.7 0 9.8 7.9 17.7 17.7 17.7h82c14.1 0 25.5-11.4 25.5-25.5 0-14-11.3-25.4-25.4-25.4z'/%3E%3Cpath class='st41' d='M608.5 133.7c2 0 4 .4 5.8 1 .9-7.3 7.1-13 14.7-13 1.2 0 2.4.2 3.6.5v-.5c0-16 13-29 29-29 14.8 0 27 11.1 28.8 25.5h.2c11.2 0 20.7 7.2 24.1 17.3 4-4.5 6.4-10.4 6.4-16.8 0-14.1-11.4-25.5-25.5-25.5h-.2c-1.7-14.3-13.9-25.5-28.8-25.5-16 0-29 13-29 29v.5c-1.1-.3-2.3-.5-3.6-.5-7.6 0-13.8 5.7-14.7 13-1.8-.6-3.8-1-5.8-1-9.8 0-17.7 7.9-17.7 17.7 0 3.8 1.2 7.2 3.2 10.1 2.7-1.8 6-2.8 9.5-2.8z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <section id="contact" ref={containerRef} className="relative py-28 px-4 overflow-hidden">
      {/* ── Section Title ─────────────────────────────────── */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
          Connect With Us
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Get In Touch
        </h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-lg mx-auto font-light">
          Official Research & Engineering Division of COEP Quantitative Finance Club.
        </p>
      </div>

      {/* ── VictoryDesign SVG Landscape Container ────────────── */}
      <div className="relative max-w-4xl mx-auto min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-[#bcdee7] flex items-center justify-center">
        
        {/* Exact SVG Background Art (Mountains, Pyramids, Sun, Trees, Land) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url("${svgBgUrl}")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />

        {/* ── VictoryDesign Material Puff Expanding Profile Card ── */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            duration: 0.8,
            delay: 0.2,
          }}
          className="relative z-20 w-full max-w-[500px] mx-4 bg-white rounded-lg shadow-[0px_3px_6px_rgba(0,0,0,0.16),0px_3px_6px_rgba(0,0,0,0.23)] overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row min-h-[280px]">
            
            {/* ── Left Column: Header (Avatar, Title, Role) ──── */}
            <div className="sm:w-[200px] p-6 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r-2 border-dashed border-[#EEEEEE] bg-white">
              
              {/* Circular Avatar with Gradient Ring & Country Flag Pin */}
              <div className="relative mb-3.5">
                <div className="w-24 h-24 rounded-full bg-[#1d89e6] p-1 shadow-[0px_0px_0px_8px_rgba(0,0,0,0.06)] hover:shadow-[0px_0px_0px_12px_rgba(0,0,0,0.1)] transition-shadow flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                    alt="COEP Seal"
                    className="w-full h-full object-contain rounded-full bg-white p-1"
                  />
                </div>

                {/* Country / Status Mini Badge */}
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white shadow-md"
                  style={{
                    background: "linear-gradient(to bottom, #FF9933 0%, #FF9933 50%, #138808 50%, #138808 100%)",
                  }}
                  title="India"
                />
              </div>

              {/* Title & Subtitle in VictoryDesign Palette */}
              <h3 className="text-xl font-normal text-[#FF5722] tracking-tight leading-tight m-0">
                COEP Quant
              </h3>
              <p className="text-sm font-normal text-[#333333] mt-1 font-sans">
                Finance Club
              </p>
            </div>

            {/* ── Right Column: Bio Quote, CTA & Social Links ── */}
            <div className="sm:w-[300px] p-6 flex flex-col justify-between bg-white text-center sm:text-left">
              
              {/* VictoryDesign Quote Text */}
              <p className="text-[13px] text-[#333333] leading-relaxed font-sans font-normal m-0">
                Even when everything is perfect, you can always make it better. Break barriers in your head, create something crazy and don't forget Code is Poetry...
              </p>

              {/* Action Buttons & Social Links Row */}
              <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                
                {/* Get in Touch Button that triggers spacecraft modal */}
                <button
                  onClick={() => setShowFormModal(true)}
                  className="px-4 py-1.5 rounded-sm bg-[#FF5722] hover:bg-[#e64a19] text-white text-xs font-medium tracking-wide shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare size={13} />
                  <span>Get In Touch</span>
                </button>

                {/* Social Links with Circular Ripple */}
                <div className="flex items-center gap-2 text-[#444444]">
                  <a
                    href="https://github.com/COEP-Quant-Finance-Club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#FF5722] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/coepqf/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#2196F3] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={14} />
                  </a>
                  <a
                    href="https://www.youtube.com/@coepquantfinanceclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="YouTube"
                  >
                    <Youtube size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Interactive Contact Form Modal with Spacecraft Rocket Launch Animation ── */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-7 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground leading-none">Get In Touch</h4>
                    <p className="text-xs text-muted-foreground font-mono mt-1">quantfinance@coeptech.ac.in</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value={`[COEP Quant Club Contact] ${form.subject}`} />
                <input type="text" name="_honey" style={{ display: "none" }} />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="table" />

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Yash Patil"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background/70 border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background/70 border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Write your inquiry or message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background/70 border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  />
                </div>

                {/* ── Spacecraft Rocket Blast-Off Submit Button (Donovan Hutchinson pJzwEw inspired) ── */}
                <div className="relative flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    🔒 Direct encrypted delivery
                  </span>

                  <div className="relative">
                    {/* Rocket Launch Element */}
                    <AnimatePresence>
                      {isLaunching && (
                        <motion.div
                          initial={{ x: 0, y: 0, rotate: 45, scale: 1, opacity: 1 }}
                          animate={{
                            x: [0, 25, 75, 260],
                            y: [0, -25, -95, -340],
                            scale: [1, 1.4, 2, 0],
                            opacity: [1, 1, 0.9, 0],
                          }}
                          transition={{ duration: 0.95, ease: "easeIn" }}
                          className="absolute -top-3 left-1/2 z-50 pointer-events-none flex flex-col items-center"
                        >
                          <Rocket size={28} className="text-cyan-400 drop-shadow-[0_0_15px_#00ffd6]" />
                          <motion.div
                            animate={{ scale: [1, 1.7, 1], opacity: [0.8, 1, 0.6] }}
                            transition={{ repeat: Infinity, duration: 0.12 }}
                            className="flex items-center -mt-1"
                          >
                            <Flame size={22} className="text-orange-500 fill-orange-500 rotate-180 drop-shadow-[0_0_12px_#f97316]" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={loading || submitted}
                      className="relative overflow-hidden h-11 px-7 rounded-lg bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75 shadow-lg group"
                    >
                      {submitted ? (
                        <>
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          <span>Payload Delivered!</span>
                        </>
                      ) : isLaunching ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                            className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full"
                          />
                          <span>Launching Rocket...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Rocket size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-accent" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}