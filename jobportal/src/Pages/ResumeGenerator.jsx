import React, { useEffect, useState } from "react";
import { generateResume, checkPaid, downloadPdf, createRazorpayOrder, verifyRazorpayPayment } from "../api/api";
import PaymentModal from "./PaymentModal";
import ResumeLoader from "./ResumeLoader";

export default function ResumeGenerator() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const [prompt, setPrompt] = useState("Java fresher with Spring Boot and React project experience.");
    const [loading, setLoading] = useState(false);
    const [resumeText, setResumeText] = useState("");
    const [resumeId, setResumeId] = useState(null);
    const [paid, setPaid] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [payLoading, setPayLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch Payment Status
    useEffect(() => {
        if (userId) {
            checkPaid(userId).then(setPaid).catch(() => setPaid(false));
        }
    }, [userId]);

    // Generate Resume
    async function onGenerate(e) {
        e.preventDefault();

        if (!userId) {
            setError("Login required.");
            return;
        }

        setError("");
        setLoading(true);
        setResumeText("");
        setResumeId(null);

        try {
            const data = await generateResume({ userId, prompt });
            setResumeText(data.resumeText || "");
            setResumeId(data.resumeId || null);
        } catch {
            setError("Failed to generate resume.");
        } finally {
            setLoading(false);
        }
    }

    // Download Resume
    async function onDownload() {
        if (!resumeId) {
            setError("Generate a resume first.");
            return;
        }

        const isPaid = await checkPaid(userId).catch(() => false);
        setPaid(isPaid);

        if (!isPaid) {
            setModalOpen(true);
            return;
        }

        try {
            const blob = await downloadPdf(userId, resumeId);
            const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));

            const a = document.createElement("a");
            a.href = url;
            a.download = `resume-${resumeId}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch {
            setError("Download failed.");
        }
    }

    // Razorpay Payment Handler
    async function handlePay() {
        setPayLoading(true);
        try {
            // 1) Create Order (Backend)
            const res = await createRazorpayOrder({ userId, amount: 99 });
            const { orderId, amount, currency, keyId } = res.data;

            // 2) Load Razorpay Script
            await new Promise((resolve, reject) => {
                if (document.getElementById("rzp-script")) return resolve();
                const script = document.createElement("script");
                script.id = "rzp-script";
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });

            // 3) Open Razorpay Checkout
            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "Resume Generator Premium",
                description: "Unlock Resume Download",
                order_id: orderId,
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: { color: "#4f46e5" },
                handler: async function (response) {
                    // 4) Verify Payment Signature (Backend)
                    const verify = await verifyRazorpayPayment({
                            userId,
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        });



                    if (verify.data.success) {
                        setPaid(true);
                        setModalOpen(false);
                        await onDownload();
                    } else {
                        setError("Payment verification failed.");
                    }
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error(err);
            setError("Payment failed.");
        } finally {
            setPayLoading(false);
        }
    }

    // Show loader while generating
    if (loading) return <ResumeLoader />;

    if (!userId) {
        return (
            <div className="bg-bright-sun-200 p-6 rounded shadow">
                <p className="text-red-600">Please login to use Resume Generator.</p>
            </div>
        );
    }

    return (
        <div className="bg-mine-shaft-800 text-mine-shaft-50 shadow rounded p-6">

            {/* Prompt Input */}
            <form onSubmit={onGenerate}>
                <label className="block py-2 text-md font-[poppins] text-mine-shaft-200">
                    Enter prompt (what you want on the resume)
                </label>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="mt-2 w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                ></textarea>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Generate Resume
                    </button>

                    <button
                        type="button"
                        onClick={onDownload}
                        disabled={!resumeText}
                        className="px-4 py-2 border rounded"
                    >
                        {paid ? "Download PDF" : "Pay & Download (₹99)"}
                    </button>
                </div>

                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            </form>

            {/* Resume Preview */}
            {resumeText && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Preview</h3>

                    <div
                        className="border rounded p-6 bg-white text-gray-800 shadow-sm leading-relaxed"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {resumeText}
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            <PaymentModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onPay={handlePay}
                loading={payLoading}
            />
        </div>
    );
}
