import React from "react";

const feedbacks = [
    {
        id: 1,
        title: "The AI chatbot is surprisingly accurate",
        text: "I wasn’t sure about using an AI assistant for my pet, but Furrmaa’s chatbot gave clear guidance and helped me decide when to consult a vet.",
        name: "Ankit Verma",
        role: "Cat Parent",
    },
    {
        id: 2,
        title: "Adoption and rescue made simple",
        text: "The adoption and lost-pet listings are a blessing. We’ve been able to connect pets with families much faster through Furrmaa.",
        name: "Neha Joshi",
        role: "Pet Volunteer",
    },
    {
        id: 3,
        title: "Clean design and smooth experience",
        text: "The app is intuitive and well designed. Even as a first-time pet parent, I never felt confused using it.",
        name: "Rahul Mehta",
        role: "First-time Pet Owner",
    },
    {
        id: 4,
        title: "Everything I need in one app",
        text: "From ordering food to booking a vet appointment, Furrmaa has made pet care so much easier. The reminders and training videos are extremely helpful!",
        name: "Ritika Sharma",
        role: "Dog Parent",
    },
];

export default function Feedback() {
    return (
        <section className="w-full bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6">

                <p className="text-sm font-semibold text-gray-900 mb-3">
                    Happy Customer Feedback
                </p>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Trusted by Pet Parents Who Truly Care
                </h2>

                <p className="text-gray-700 max-w-3xl mb-14">
                    Thousands of pet parents rely on Furrmaa every day to keep their pets
                    healthy, happy, and safe. Here’s what our community has to say.
                </p>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {feedbacks.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                        >
                            <div className="flex gap-1 mb-4 text-yellow-400">
                                ★★★★★
                            </div>

                            <h4 className="font-semibold text-gray-900 mb-3">
                                “{item.title}”
                            </h4>

                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                “{item.text}”
                            </p>

                            <div className="text-sm font-semibold text-gray-900">
                                {item.name}{" "}
                                <span className="font-normal text-gray-500">
                                    – {item.role}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
