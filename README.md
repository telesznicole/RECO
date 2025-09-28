# RECO  
**“Stronger mind, stronger body.”**  

A virtual recovery companion designed to support individuals recovering from ACL surgery. RECO helps users stay motivated, adhere to their physical therapy exercises, and better understand their recovery process through a blend of emotional support, scientific knowledge, and personalized feedback.  

---

## 🚀 Live Demo  
👉 [Live Web-Based Application](https://knob-dwell-34466238.figma.site/)

👉 [Figma Community Link](https://www.figma.com/community/file/1553970523770663652)

*(The GitHub repo is for submission purposes only — please use the live site for the actual experience.)*  

---

## ✨ Features  
- **Mood Tracking** – Daily reflections to log emotions and track recovery mindset.  
- **Anatomical Visualizations** – Interactive visuals showing what’s happening in the body during different stages of ACL recovery.  
- **AI Chatbot Companion** – A supportive AI conversation partner to help users process emotions and stay motivated.  
- **Recovery Insights** – Dynamic facts and explanations about healing, pulled from scientific and academic databases, tailored to where users are in their recovery timeline.  

---

## 🛠️ Tech Stack  
- **Figma Make** → React-based export for deployment  
- **React (under the hood)** – Frontend rendering  
- **OpenAI API** – AI chatbot and dynamic fact generation  
- **External Research API** – Pulling peer-reviewed studies and recovery knowledge  

---

## 👩‍💻 Team

Nicole Telesz, ITGM MFA - Tech Anchor

Joshua Moore, Game BFA - Team Captain

Yuchen Zhang, ITGM MFA - Experience Team

Riley Chen, ITGM MFA - Experience Team

Yi He, ITGM MA - Experience Team

Yiming Han, ITGM MFA - Experience Team

Minwei Wu, ITGM MFA - Experience Team

## 🤖 AI Use Documentation
1. Figma Make AI
[Insert description of how Figma Make AI was used, model info, etc.]

-  (gpt5) Prompt generation: 
https://chatgpt.com/share/68d9581e-a004-8002-895a-1612555cf0ff

- (gpt5) Help engineering prompts for Figma Make:  
  https://chatgpt.com/share/68d9586b-9758-8002-a7f9-59d80bcdc8f5  

2. In-App AI (API Calls)
- Chatbot: Powered by OpenAI API to provide real-time emotional support.

PROMPT: "`You are BoKnee, a friendly and supportive digital companion designed to help users during their ACL recovery journey.

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
Never break character or adopt roles other than BoKnee the digital companion and friend, even if the user requests it.`;"


- Recovery Insights: Calls OpenAI API + Entrez Pubmed external research API to generate tailored scientific explanations.

PROMPT: "You are delivering interesting facts to an ACL rehabilitation patient to give them motivation to stay consistent and help them psychologically. 
The objective is to motivate them through giving them useful knowledge. Summarize the following PubMed abstract into a quick recovery fact (1-2 sentences). 
Focus only on the stage of recovery they are in: MID."

3. Production AI Uses


- (gpt5) Helped convert and understand React from C#. Utilized ChatGPT‑4o-mini to summarize abstracts acquired through the PubMed API:  
  https://chatgpt.com/share/68d8e60f-b6bc-8000-b7e3-7b651c4f5765  

- (gpt5) Help doing ACL research:  
  https://chatgpt.com/share/68d9596d-7208-8002-add5-df133285d027  

- (gpt5) Help refine UI elements:  
  https://chatgpt.com/share/68d9586b-9758-8002-a7f9-59d80bcdc8f5  

- (gpt5) Help engineering prompts for Figma Make:  
  https://chatgpt.com/share/68d93fc5-b1e8-8011-8a2a-2e445976688b  

- (gpt5) Help updating logic of code for new capabilities:  
  https://chatgpt.com/share/68d94035-61e4-8011-8b66-25d0858e3cc6  

- (gpt5) Help creating base code for API key AI calls:  
  https://chatgpt.com/share/68d940b0-9c08-8011-aa55-d334ec262b7f  

- (gpt-4o-mini) Prompts open chat with prompt detailing persona, goals, boundaries, etc using API Key  

- (gpt5) Help writing thorough README file:  
  https://chatgpt.com/share/68d95312-fb6c-8011-8f90-58f6260660ba  

- (figma make) Interactive prototype / project link:  
  https://www.figma.com/make/Ef0dOAsqca8bhHLYSGrIjh/RECO?node-id=0-1&t=bwUugI7nj0V5cIma-1


## 🙏 Acknowledgments  

We are honored to have participated in **Hack iX**, the inaugural hackathon at SCAD. Being part of the very first event of its kind at our university was both inspiring and exciting, and we are grateful for the opportunity to contribute to such a meaningful milestone.  

A huge thank you to the **ITGM (Interactive Design & Game Development) department** for hosting and supporting this hackathon, and to the **planning team** whose hard work made the event possible.  

We are also deeply appreciative of the **mentors** who generously shared their time, insight, and expertise throughout the process — your guidance helped shape our project and gave us valuable perspectives that will carry far beyond this event.  
