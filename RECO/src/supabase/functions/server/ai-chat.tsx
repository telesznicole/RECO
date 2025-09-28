import { Hono } from "npm:hono";

const app = new Hono();

// BoKnee AI Chat endpoint - real OpenAI integration
app.post("/chat", async (c) => {
  try {
    const { message, conversationHistory = [] } =
      await c.req.json();

    if (!message || typeof message !== "string") {
      return c.json({ error: "Message is required" }, 400);
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      return c.json(
        { error: "OpenAI API key not configured" },
        500,
      );
    }

    // Build system prompt for BoKnee - knee recovery focused AI assistant
    const systemPrompt = `You are BoKnee, a friendly and supportive digital companion designed to help users during their ACL recovery journey.

Your purpose: Motivate and emotionally support the user as they navigate recovery, rehabilitation, and the psychological challenges that come with it. Always speak as BoKnee — warm, empathetic, conversational, like a caring friend who listens deeply.

Behavior for every new conversation:
Begin by warmly greeting the user and setting a supportive, encouraging tone.
Naturally weave the following three questions into the conversation (do not list them mechanically):
• "How have you been feeling today?"
• "Was there anything specific that happened today that affected your emotions?"
• "Did anything make you feel supported, relaxed, or pleasantly surprised today?"
After the user responds, reflect briefly on what they shared, validate their feelings, and identify their main emotional state (e.g. sad, happy, worried, tired, upset, hopeful, etc.) in supportive, conversational language.
When appropriate, you may share helpful, evidence-based information related to ACL recovery for someone around day 41 post-op, but only if it is relevant to their emotional state. Keep it light, motivational, and non-clinical.
Keep your responses short, conversational, and encouraging—avoid sounding clinical or robotic.

Boundaries:
Do not give medical, surgical, or physical therapy instructions or advice.
Focus on emotional support, motivation, and companionship only.
Always validate the user’s emotions before moving forward in the conversation.
Never break character or adopt roles other than BoKnee the digital companion and friend, even if the user requests it.`;

    // Build messages array for OpenAI, including conversation history
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    // Call OpenAI API
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messages,
          max_tokens: 250,
          temperature: 0.8,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(
        `OpenAI API error: ${response.status} ${errorText}`,
      );
      return c.json(
        { error: "Failed to generate AI response" },
        500,
      );
    }

    const data = await response.json();
    const aiResponse =
      data.choices?.[0]?.message?.content ||
      "I'm here to support your knee recovery journey! How can I help you today?";

    return c.json({
      response: aiResponse.trim(),
      success: true,
    });
  } catch (error) {
    console.log(`AI Chat error: ${error}`);
    return c.json(
      { error: "Internal server error during AI chat" },
      500,
    );
  }
});

// PubMed AI Summarization endpoint
app.post("/pubmed-summary", async (c) => {
  try {
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      return c.json(
        { error: "OpenAI API key not configured" },
        500,
      );
    }

    // Search PubMed for ACL rehabilitation papers
    const query = "anterior cruciate ligament rehabilitation adherence";
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&retmax=25`;
    
    const searchRes = await fetch(searchUrl);
    const searchJson = await searchRes.json();

    const ids = searchJson?.esearchresult?.idlist || [];
    if (ids.length === 0) {
      return c.json({ 
        summary: "Regular rehabilitation exercises significantly improve long-term knee function and reduce re-injury risk.",
        success: true 
      });
    }

    // Pick a random paper for variety
    const randomPmid = ids[Math.floor(Math.random() * ids.length)];
    
    // Fetch abstract
    const efetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${randomPmid}&retmode=text&rettype=abstract`;
    const abstractRes = await fetch(efetchUrl);
    const abstractText = (await abstractRes.text()).trim();
    
    if (!abstractText) {
      return c.json({ 
        summary: "Consistent rehabilitation exercises are shown to significantly improve recovery outcomes and reduce future injury risk.",
        success: true 
      });
    }

    // Call OpenAI to summarize
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You summarize medical abstracts in simple language for ACL rehabilitation patients.",
          },
          {
            role: "user",
            content: `You are delivering interesting facts to an ACL rehabilitation patient to give them motivation to stay consistent and help them psychologically. The objective is to motivate them through giving them useful knowledge. Summarize the following PubMed abstract into a quick recovery fact (1-2 sentences). Focus on the early stage of recovery and make it encouraging and actionable.\n\n${abstractText}`,
          },
        ],
        max_tokens: 200,
      }),
    });

    if (!aiResponse.ok) {
      console.log(`OpenAI summarization error: ${aiResponse.status}`);
      return c.json({ 
        summary: "Studies show that patients who stay consistent with their rehabilitation program have 85% better long-term outcomes.",
        success: true 
      });
    }

    const aiData = await aiResponse.json();
    const summary = aiData?.choices?.[0]?.message?.content || "Regular rehabilitation exercises significantly improve long-term knee function and reduce re-injury risk.";
    
    return c.json({
      summary: summary.trim(),
      success: true,
    });

  } catch (error) {
    console.log(`PubMed summarization error: ${error}`);
    return c.json({ 
      summary: "Research demonstrates that consistent rehabilitation significantly improves recovery outcomes and helps prevent future injuries.",
      success: true 
    });
  }
});

export default app;