document.querySelector('.btn1').addEventListener('click', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.querySelector("input[placeholder='Name']").value.trim();
    const email = document.querySelector("input[placeholder='Email']").value.trim();
    const subject = document.querySelector("input[placeholder='Subject']").value.trim();
    const message = document.querySelector("textarea[placeholder='Message']").value.trim();

    // Validate inputs
    if (!name || !email || !subject || !message) {
        alert("Please fill out all fields.");
        return;
    }

    // Construct the data object
    const dataToSend = {
        name,
        email,
        subject,
        message
    };

    // Call the function to send the message
    await sendWhatsAppMessage(dataToSend);
});

async function sendWhatsAppMessage(data) {
    const phoneNumber = "+918767491689"; // Replace with your target WhatsApp number

    try {
        const response = await fetch("https://graph.facebook.com/v21.0/422748917593803/messages", {
            method: "POST",
            headers: {
                "Authorization": "Bearer EAAH9z7v3E5YBOwIZC001FcZA3kO8AA3sVhkxsAlInvkgtcoEGR7CZBSXm8geXkCccZCNdBXxnUrqLgeMq8W9fHL4DE7RGKyOsWiajm0WlCMhtPUXDm9VJsb41bJjxCXIfE1BLf3cWu0t300hmxOZC29VOn1gvCEhROeFe4aJyzN4IH3nnX0dlfFHtidCtMUMm3Vov6x8ZBCZAWbZBhrX0aJ3h2QwlJeC6JVGPAqzWCVL", // Replace with your token
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: phoneNumber,
                type: "template",
                template: {
                    name: "portfolio_template", // Replace with your template name
                    language: { code: "en" },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                { type: "text", text: data.name }, // Name parameter ({{1}})
                                { type: "text", text: data.email }, // Email parameter ({{2}})
                                { type: "text", text: data.subject }, // Subject parameter ({{3}})
                                { type: "text", text: data.message } // Message parameter ({{4}})
                            ]
                        }
                    ]
                }
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Failed to send message:", responseData);
            alert(`Failed to send message: ${responseData.error.message}`);
        } else {
            console.log("Message sent successfully:", responseData);
            alert("Your message has been sent successfully via WhatsApp!");
        }
    } catch (error) {
        console.error("Error while sending WhatsApp message:", error);
        alert(`An error occurred: ${error.message}`);
    }
}
