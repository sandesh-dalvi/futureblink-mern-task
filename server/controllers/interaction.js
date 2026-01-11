import Interaction from "../models/Interaction.js";

// AI Interaction
export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    // console.log(prompt);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call OpenRouter API
    const response = await fetch(process.env.OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("OpenRouter API error : ", errorData);

      return res
        .status(response.status)
        .json({ error: "Failed to get AI response", details: errorData });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    // console.log(aiResponse);

    return res.json({ response: aiResponse });
  } catch (error) {
    console.log("Error : ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

// Save Interaction
export const saveInteraction = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res
        .status(400)
        .json({ error: "Prompt and response are required" });
    }

    //save to database
    const interaction = new Interaction({ prompt, response });

    await interaction.save();

    res.status(201).json({
      message: "Interaction was saved successfully",
      id: interaction._id,
      data: interaction,
    });
  } catch (error) {
    console.log("Error : ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

//Get All Interactions
export const getAllInteractions = async (req, res) => {
  try {
    const interactions = await Interaction.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(interactions);
  } catch (error) {
    console.log("Error : ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", mesage: error.message });
  }
};
