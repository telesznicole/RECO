import image_b5d1a5146e60ad559b7de929a459b781dbed49de from 'figma:asset/b5d1a5146e60ad559b7de929a459b781dbed49de.png';
import image_e31d34e655767ae08d9970950dc56f0031e8e33b from 'figma:asset/e31d34e655767ae08d9970950dc56f0031e8e33b.png';
import React, { useState, useRef, useEffect } from "react";
import svgPaths from "./imports/svg-5xd632gsbs";
import svgPathsKeyboard from "./imports/svg-ojw93qakjr";
import img113 from "figma:asset/f8bb7dc1ddf8f08be2685db94619d128ba4cad73.png";
import characterGif from "figma:asset/9d632cfef0755c0ca97ff75fdec79533412c67db.png";
import diagramImage from "figma:asset/f4e20c0dca84076ecbe8bcc22c0f0f538bac70c0.png";
import newDiagramImage from "figma:asset/e4daa7b6a23ba7432e0c2d3354521dd97d507c05.png";
import topLeftImage from "figma:asset/09e46f4f31ceda50f5e8e4d187a7572b048823f6.png";
import { img112 } from "./imports/svg-e7iig";
import { AIClient } from "./utils/ai-client";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// AI Integration - Now using real OpenAI GPT responses via Supabase
// This replaces the mock BoKneeAI class with intelligent, contextual conversations

// ---------- Keyboard Components ----------
function KeyboardSuggestion({
  onSuggestionClick,
}: {
  onSuggestionClick: (text: string) => void;
}) {
  const suggestions = ["I", "The", "I'm"];
  return (
    <div
      className="box-border content-stretch flex items-center justify-center px-0 py-[8px] relative shrink-0 w-full"
      data-name="Keyboard/Suggestion"
    >
      {suggestions.map((suggestion, index) => (
        <React.Fragment key={suggestion}>
          <button
            onClick={() => onSuggestionClick(suggestion)}
            className="basis-0 flex flex-col font-['SF_Pro:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[18px] text-black text-center bg-transparent border-none cursor-pointer"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="leading-[normal] m-0">{suggestion}</p>
          </button>
          {index < suggestions.length - 1 && (
            <div
              className="bg-[rgba(0,0,0,0.18)] h-[24px] rounded-[1px] shrink-0 w-px"
              data-name="tr"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function KeyLetter({
  letter,
  onKeyPress,
}: {
  letter: string;
  onKeyPress: (key: string) => void;
}) {
  return (
    <button
      onClick={() => onKeyPress(letter)}
      className="basis-0 bg-[rgba(255,255,255,0.89)] grow h-full min-h-px min-w-px relative rounded-[8.5px] shrink-0 border-none cursor-pointer active:bg-[rgba(255,255,255,0.7)] active:scale-95 transition-all duration-100"
      data-name="Key/Letter"
    >
      <div
        className="absolute font-['SF_Compact_Text:Regular',_sans-serif] leading-[0] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center translate-x-[-50%] w-[20px] pointer-events-none"
        style={{ top: "calc(50% - 17.5px)" }}
      >
        <p className="leading-[normal] m-0">{letter}</p>
      </div>
    </button>
  );
}

function KeySpecial({
  icon,
  onKeyPress,
  width = 42,
}: {
  icon: string;
  onKeyPress: () => void;
  width?: number;
}) {
  return (
    <button
      onClick={onKeyPress}
      className="bg-[rgba(255,255,255,0.89)] h-full relative rounded-[8.5px] shrink-0 border-none cursor-pointer active:bg-[rgba(255,255,255,0.7)] active:scale-95 transition-all duration-100"
      style={{ width: `${width}px` }}
      data-name="Key/Special"
    >
      <div
        className="absolute font-['SF_Pro_Text:Medium',_sans-serif] leading-[0] left-1/2 not-italic text-[19px] text-[rgba(0,0,0,0.65)] text-center translate-x-[-50%] pointer-events-none"
        style={{ top: "calc(50% - 11.5px)" }}
      >
        <p className="leading-[normal] m-0">{icon}</p>
      </div>
    </button>
  );
}

function KeySpace({ onKeyPress }: { onKeyPress: () => void }) {
  return (
    <button
      onClick={onKeyPress}
      className="basis-0 bg-[rgba(255,255,255,0.89)] grow h-full min-h-px min-w-px rounded-[8.5px] shrink-0 border-none cursor-pointer active:bg-[rgba(255,255,255,0.7)] active:scale-[0.98] transition-all duration-100"
      data-name="Key/Space"
    />
  );
}

function KeyboardDefault({
  onKeyPress,
  onBackspace,
  onReturn,
  onSuggestionClick,
  inputValue,
  onClose,
}: {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onReturn: () => void;
  onSuggestionClick: (text: string) => void;
  inputValue: string;
  onClose: () => void;
}) {
  const firstRow = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
  ];
  const secondRow = [
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
  ];
  const thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/10 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Keyboard - 修正对齐：贴底、左右对齐画布、宽度自适应到画布（最大402px） */}
      <div
        className="absolute inset-x-0 bottom-0 box-border content-stretch flex flex-col items-center
                   backdrop-blur-[5px] backdrop-filter bg-[rgba(218,218,218,0.75)]
                   pb-[80px] pt-[8px] px-[4px]
                   rounded-bl-[62.16px] rounded-br-[62.16px] rounded-tl-[27px] rounded-tr-[27px]
                   w-full max-w-[402px] mx-auto z-50 transition-transform duration-300 ease-out"
        data-name="Keyboard/Default"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-bl-[62.16px] rounded-br-[62.16px] rounded-tl-[27px] rounded-tr-[27px]"
        />

        <KeyboardSuggestion
          onSuggestionClick={onSuggestionClick}
        />

        {/* Keyboard Layout */}
        <div
          className="box-border content-stretch flex flex-col gap-[10px] items-center pb-0 pt-[8px] px-0 relative shrink-0 w-full"
          data-name="Keyboard/Layout"
        >
          {/* First Row */}
          <div className="content-stretch flex gap-[6px] h-[45px] items-center justify-center relative shrink-0 w-full">
            {firstRow.map((letter) => (
              <KeyLetter
                key={letter}
                letter={letter}
                onKeyPress={onKeyPress}
              />
            ))}
          </div>

          {/* Second Row */}
          <div className="h-[45px] relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center relative size-full">
              <div className="box-border content-stretch flex gap-[6px] h-[45px] items-center justify-center px-[16px] py-0 relative w-full">
                {secondRow.map((letter) => (
                  <KeyLetter
                    key={letter}
                    letter={letter}
                    onKeyPress={onKeyPress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="content-stretch flex gap-[14px] h-[45px] items-center justify-center relative shrink-0 w-full">
            <KeySpecial icon="􀆝" onKeyPress={() => {}} />
            <div className="basis-0 content-stretch flex gap-[6px] grow h-full items-start min-h-px min-w-px relative shrink-0">
              {thirdRow.map((letter) => (
                <KeyLetter
                  key={letter}
                  letter={letter}
                  onKeyPress={onKeyPress}
                />
              ))}
            </div>
            <KeySpecial icon="􁂈" onKeyPress={onBackspace} />
          </div>
        </div>

        <div
          className="h-[10px] shrink-0 w-full"
          data-name="Spacer"
        />

        {/* Bottom Row */}
        <div className="content-stretch flex gap-[6px] h-[45px] items-center justify-center relative shrink-0 w-full">
          <KeySpecial
            icon="123"
            onKeyPress={() => {}}
            width={91}
          />
          <KeySpace onKeyPress={() => onKeyPress(" ")} />
          <KeySpecial
            icon="􀅇"
            onKeyPress={onReturn}
            width={91}
          />
        </div>

        <div className="absolute bottom-[56px] font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic right-[42px] text-[27px] text-[rgba(0,0,0,0.5)] text-center text-nowrap translate-x-[50%] translate-y-[100%]">
          <p className="leading-[normal] whitespace-pre m-0">
            􀊰
          </p>
        </div>

        <div
          className="absolute bottom-[27px] left-[29px] size-[27px]"
          data-name="emoji"
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 27 27"
          >
            <g
              id="emoji"
              style={{ mixBlendMode: "plus-darker" }}
            >
              <path
                d={svgPathsKeyboard.p18200800}
                fill="var(--fill-0, black)"
                fillOpacity="0.5"
              />
            </g>
          </svg>
        </div>

        <div className="absolute inset-0 pointer-events-none shadow-[0px_1px_2px_0px_inset_#ffffff]" />
      </div>
    </>
  );
}

// ---------- Chat Components ----------
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] px-4 py-2 rounded-[20px] bg-[#f1f1f1] text-[#333333]">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
          <span className="text-[14px] text-gray-500 ml-2">
            BoKnee is thinking...
          </span>
        </div>
      </div>
    </div>
  );
}

function ChatMessages({
  messages,
  isTyping,
  keyboardActive,
  onBackgroundClick,
}: {
  messages: Message[];
  isTyping: boolean;
  keyboardActive: boolean;
  onBackgroundClick: () => void;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);
  if (messages.length === 0 && !isTyping) return null;

  return (
    <>
      {/* Background overlay - clickable to go back to home page */}
      <div
        className="fixed inset-0 bg-black/20 z-5 transition-opacity duration-300"
        onClick={onBackgroundClick}
      />

      {/* Chat messages container */}
      <div
        className={`absolute left-[25px] right-[25px] overflow-y-auto bg-white/55 backdrop-blur-sm rounded-[24px] p-4 space-y-3 z-10 transition-all duration-300 ${keyboardActive ? "top-[80px] bottom-[460px]" : "top-[480px] bottom-[90px]"}`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-[20px] ${message.isUser ? "bg-[#333333] text-white" : "bg-[#f1f1f1] text-[#333333]"}`}
            >
              <p className="text-[16px] leading-[20px] m-0">
                {message.text}
              </p>
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}

// ---------- Knee Highlight & Modal Components ----------
function KneeHighlight({
  keyboardActive,
  onClick,
}: {
  keyboardActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`absolute pointer-events-auto cursor-pointer z-5 transition-all duration-300
        ${keyboardActive ? "top-[180px]" : "top-[400px]"}
      `}
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        marginLeft: "-25px", // Slight offset to align with knee area
      }}
      onClick={onClick}
    >
      {/* Main Knee Highlight Ellipse with stronger glow */}
      <div
        className="w-20 h-14 rounded-full"
        style={{
          backgroundColor: "rgba(141, 202, 255, 0.6)", // Increased opacity for visibility
          filter: "blur(8px)", // Reduced blur for sharper visibility
          animation:
            "kneeGlow 2s ease-in-out infinite alternate",
          boxShadow:
            "0 0 20px rgba(141, 202, 255, 0.8), 0 0 40px rgba(141, 202, 255, 0.4)",
        }}
      />

      {/* Inner bright core */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          backgroundColor: "rgba(141, 202, 255, 0.8)",
          filter: "blur(4px)",
          animation:
            "kneeGlow 1.5s ease-in-out infinite alternate",
        }}
      />

      {/* Outer pulsing ring */}
      <div
        className="absolute -inset-2 w-24 h-18 rounded-full animate-ping"
        style={{
          backgroundColor: "rgba(141, 202, 255, 0.3)",
          animationDuration: "2s",
        }}
      />

      {/* Additional sparkle effects */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-80" />
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
    </div>
  );
}

function KneeModal({
  isOpen,
  onClose,
  aiSummary,
}: {
  isOpen: boolean;
  onClose: () => void;
  aiSummary: string;
}) {
  const [showDiagramLayer, setShowDiagramLayer] =
    useState(false);

  if (!isOpen) return null;

  if (showDiagramLayer) {
    return (
      <>
        {/* Background overlay with darker dimming for diagram layer */}
        <div
          className="fixed inset-0 bg-black/50 z-60 transition-opacity duration-300"
          onClick={() => setShowDiagramLayer(false)}
        />

        {/* Simplified diagram layer - only header, return button, and new image */}
        <div
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-60 transform transition-transform duration-300 ease-out"
          style={{
            maxWidth: "402px",
            margin: "0 auto",
            height: "85vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-[24px] font-semibold text-[#333333]">
              Knee Anatomy Diagram
            </h2>
            <button
              onClick={() => setShowDiagramLayer(false)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors text-xl"
            >
              ×
            </button>
          </div>

          {/* New diagram image - centered and fitted */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
            <img
              src={newDiagramImage}
              alt="Knee Anatomy Diagram"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Background overlay with 20% dimming */}
      <div
        className="fixed inset-0 bg-black/20 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal sliding up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#F1F1F1] rounded-t-[24px] z-50 p-6 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          maxWidth: "402px",
          margin: "0 auto",
          height: "90vh",
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-semibold text-[#333333]">
            What's in knee
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content container with scroll */}
        <div
          className="flex flex-col space-y-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          {/* Advice Card */}
          <div className="bg-[#F5B849]/10 rounded-[16px] p-4 border border-[#F5B849]/20">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#F5B849] rounded-full flex items-center justify-center">
                <span className="text-white text-[16px]">
                  💡
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-[20px] font-medium text-[#333333] mb-2">
                  Helpful Effect
                </h3>
                <p className="text-[16px] text-[#666666] leading-[20px]">
                  {aiSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Compact Diagram Preview */}

          <div className="flex justify-center mb-4">
            <img
              src={diagramImage}
              alt="Knee Anatomy Diagram Preview"
              className="max-w-[380px] max-h-[280px] object-contain rounded-[12px]"
            />
          </div>

          {/* Diagram Button */}
          <button
            onClick={() => setShowDiagramLayer(true)}
            className="w-full bg-[#F5B849] text-white py-3 rounded-[12px] font-medium text-[18px] hover:bg-[#E5A635] transition-colors text-center"
          >
            Diagram
          </button>
        </div>
      </div>
    </>
  );
}

// ---------- Main Subcomponents ----------
function Days() {
  return (
    <div
      className="absolute contents left-[313px] top-[35px]"
      data-name="days"
    >
      <div className="absolute h-[59px] left-[313px] top-[35px] w-[65px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 65 59"
        >
          <g id="Group 9">
            <path
              d={svgPaths.pe31ae80}
              fill="var(--fill-0, #333333)"
              id="Rectangle 6"
            />
            <rect
              fill="var(--fill-0, #F5B849)"
              height="9.80907"
              id="Rectangle 7"
              rx="1"
              width="5.37845"
              x="14.6997"
            />
            <rect
              fill="var(--fill-0, #F5B849)"
              height="9.80907"
              id="Rectangle 8"
              rx="1"
              width="5.37845"
              x="45.0218"
            />
            <rect
              fill="var(--fill-0, #F5B849)"
              height="9.80907"
              id="Rectangle 9"
              rx="1"
              width="5.37845"
              x="29.8606"
            />
          </g>
        </svg>
      </div>
      <div
        className="absolute flex flex-col font-['Holtwood_One_SC:Regular',_sans-serif] h-[31.216px] justify-center leading-[0] not-italic text-[32px] text-center text-white translate-x-[-50%] translate-y-[-50%] w-[50.089px]"
        style={{
          top: "calc(50% - 362.789px)",
          left: "calc(50% + 142.792px)",
        }}
      >
        <p className="leading-[4px] m-0">41</p>
      </div>
      <div
        className="absolute font-['Days_One:Regular',_sans-serif] h-[19px] leading-[0] not-italic text-[10px] text-center text-white top-[42px] translate-x-[-50%] w-[30px]"
        style={{ left: "calc(50% + 144px)" }}
      >
        <p className="leading-[22px] m-0">Day</p>
      </div>
    </div>
  );
}

function MaskGroup({
  keyboardActive,
}: {
  keyboardActive: boolean;
}) {
  return (
    <div
      className={`absolute contents left-[123px] transition-all duration-300 ${keyboardActive ? "top-[330px]" : "top-[414px]"}`}
      data-name="Mask group"
    >
      <div
        className={`absolute h-[410px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[45px_216px] mask-size-[95px_95px] pointer-events-none translate-x-[-50%] w-[225px] transition-all duration-300 ${keyboardActive ? "top-[140px]" : "top-[198px]"}`}
        data-name="未标题-1_画板 1 2"
        style={{
          left: "calc(50% - 10.5px)",
          maskImage: `url('${img112}')`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute h-[246.16%] left-[-43.83%] max-w-none top-[-70.83%] w-[317.68%]"
            src={img113}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute border border-black border-solid inset-0"
        />
      </div>
    </div>
  );
}

function SpeechBubble({
  keyboardActive,
}: {
  keyboardActive: boolean;
}) {
  return (
    <div
      className={`absolute flex h-[145px] items-center justify-center left-[50px] w-[301px] transition-all duration-300 ${keyboardActive ? "top-[70px] opacity-0 pointer-events-none" : "top-[100px] opacity-100"}`}
    >
      <div className="flex-none rotate-[180deg] scale-y-[-100%]">
        <div className="h-[145px] relative w-[301px]" />
      </div>
    </div>
  );
}

function InputBox({
  onSubmit,
  onKeyboardToggle,
}: {
  onSubmit: (message: string) => void;
  onKeyboardToggle: (show: boolean) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自定义键盘：点按字符
  const handleKeyPress = (key: string) => {
    setInputValue((prev) => prev + key);
  };
  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };
  const handleReturn = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue("");
      setShowKeyboard(false);
      onKeyboardToggle(false);
    }
  };
  const handleSuggestionClick = (text: string) => {
    setInputValue((prev) => prev + text + " ");
  };

  const handleInputClick = () => {
    setShowKeyboard(true);
    onKeyboardToggle(true);
  };
  const handleClose = () => {
    setShowKeyboard(false);
    onKeyboardToggle(false);
  };

  // 打开时自动 focus 到原生 input
  useEffect(() => {
    if (showKeyboard && inputRef.current) {
      inputRef.current.focus();
      // 将光标放到末尾
      const v = inputRef.current.value;
      inputRef.current.setSelectionRange(v.length, v.length);
    }
  }, [showKeyboard, inputValue]);

  return (
    <>
      {/* 激活态：上移的浮动输入框（原生 input） */}
      {showKeyboard && (
        <div className="absolute left-[51px] top-[473px] z-50">
          {/* 背景外框 */}
          <div className="absolute bg-white h-[48px] left-0 rounded-[65px] top-0 w-[301px] shadow-lg border border-gray-200" />

          {/* 真正的输入框 */}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleReturn();
            }}
            placeholder="Ask me anything..."
            className="absolute left-[20px] top-[12px] w-[220px] h-[24px] bg-transparent outline-none text-[18px] text-[#333333] placeholder:text-[rgba(51,51,51,0.4)]"
          />

          {/* 伪光标（可选）：当有内容时显示“闪烁竖线” */}

          {/* 关闭按钮 */}
          <button
            onClick={handleClose}
            className="absolute right-[15px] top-[12px] w-[24px] h-[24px] bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* 未激活态：底部的“打开输入框”胶囊 */}
      {!showKeyboard && (
        <div className="absolute left-[25px] top-[800px] w-[351px] transition-all duration-300 z-30">
          <div className="relative">
            <div className="absolute bg-white h-[48px] left-0 rounded-[65px] top-0 w-[351px] shadow-md" />
            <button
              onClick={handleInputClick}
              className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[0] left-[44.31px] text-[18px] text-[rgba(51,51,51,0.4)] top-[13px] w-[181.914px] bg-transparent border-none cursor-pointer text-left"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="leading-[22px] m-0">
                Ask me anything...
              </p>
            </button>
          </div>
        </div>
      )}

      {/* 自定义键盘（保留），与原生输入框共享同一个 inputValue */}
      {showKeyboard && (
        <KeyboardDefault
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onReturn={handleReturn}
          onSuggestionClick={handleSuggestionClick}
          inputValue={inputValue}
          onClose={handleClose}
        />
      )}
    </>
  );
}

function EmotionButtons({
  keyboardActive,
  onDownClick,
}: {
  keyboardActive: boolean;
  onDownClick: () => void;
}) {
  const emotions = [
    { emoji: "😊", label: "Great", left: "25px" },
    { emoji: "🙂", label: "Good", left: "98px" },
    { emoji: "😐", label: "Okay", left: "171px" },
    { emoji: "😔", label: "Down", left: "244px" },
    { emoji: "😢", label: "Tough", left: "317px" },
  ];
  const handleEmotionClick = (emotionLabel: string) => {
    if (emotionLabel === "Down") onDownClick();
  };
  const groupTop = 650;

  return (
    <div
      className={`absolute left-0 right-0 transition-all duration-300 ${keyboardActive ? "opacity-30 pointer-events-none" : "opacity-100"}`}
      style={{ top: `${groupTop}px` }}
    >
      {emotions.map((emotion, index) => (
        <div
          key={index}
          className="absolute"
          style={{ left: emotion.left, top: 0 }}
        >
          <button
            onClick={() => handleEmotionClick(emotion.label)}
            className="absolute bg-white h-[96px] w-[59px] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 border-none cursor-pointer hover:bg-gray-50 active:scale-95 transition-all duration-200"
          />
          <div
            className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[0] text-[32px] text-black text-nowrap top-[23px] pointer-events-none"
            style={{
              fontVariationSettings: "'wdth' 100",
              left: "14px",
            }}
          >
            <p className="leading-[22px] whitespace-pre m-0">
              {emotion.emoji}
            </p>
          </div>
          <div
            className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[0] text-[14px] text-black text-nowrap top-[56px] pointer-events-none"
            style={{
              fontVariationSettings: "'wdth' 100",
              left: "11px",
            }}
          >
            <p className="leading-[22px] whitespace-pre m-0">
              {emotion.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- App ----------
export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAnimatedCharacter, setShowAnimatedCharacter] =
    useState(false);
  const [showKneeModal, setShowKneeModal] = useState(false);
  const [aiClient] = useState(() => new AIClient());
  const [aiSummary, setAiSummary] = useState(
    "Understanding your knee anatomy helps you communicate better with healthcare providers and track your recovery progress more effectively.",
  );

  // PubMed AI Integration - using backend API
  const searchAndSummarize = async () => {
    try {
      const { projectId, publicAnonKey } = await import(
        "./utils/supabase/info"
      );

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2d02aba3/pubmed-summary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({}),
        },
      );

      if (!response.ok) {
        console.error("Backend API error:", response.status);
        return;
      }

      const data = await response.json();
      if (data.success && data.summary) {
        setAiSummary(data.summary);
      }
    } catch (err) {
      console.error("PubMed API error:", err);
    }
  };

  // Auto-fetch on component mount
  useEffect(() => {
    searchAndSummarize();
  }, []);

  const handleDownClick = () => setShowAnimatedCharacter(true);
  const handleKneeClick = () => setShowKneeModal(true);
  const handleCloseKneeModal = () => setShowKneeModal(false);

  // Function to reset to home page
  const handleReturnToHome = () => {
    setMessages([]);
    setIsTyping(false);
    setKeyboardActive(false);
    setShowAnimatedCharacter(false);
  };

  const addMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Pass conversation history to maintain context
      const conversationHistory = [...messages, userMessage];
      const aiResponse = await aiClient.generateResponse(
        text,
        conversationHistory,
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Let's try again in a moment!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* iPhone 16 Pro Frame */}
      <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
        {/* iPhone Screen */}
        <div
          className="bg-[#f1f1f1] relative overflow-hidden rounded-[2.5rem]"
          style={{ width: "402px", height: "874px" }}
          data-name="BoKnee-iPhone-Frame"
        >
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50" />

          {/* App Content */}
          <div className="relative w-full h-full" data-name="3">
            {/* Top Left Image - same height as Days component */}
            <div className="absolute left-[27px] top-[42px]">
              <img
                src={image_b5d1a5146e60ad559b7de929a459b781dbed49de}
                alt="Top Left Decoration"
                className="h-[50px] w-auto"
              />
            </div>

            {/* Days Counter */}
            <Days />

            {/* Speech Bubble */}
            <SpeechBubble keyboardActive={keyboardActive} />

            {/* Speech Bubble Text */}
            <div
              className={`absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[0] left-[73px] text-[20px] text-black top-[114px] w-[267px] transition-all duration-300 ${keyboardActive || showAnimatedCharacter ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="leading-[22px] m-0 font-[Holtwood_One_SC] text-center text-[24px] px-[15px]">
                How Does your Knee feel today?
              </p>
            </div>

            {/* Character Image */}
            <div className="relative">
              <div
                className={`absolute left-1/2 translate-x-[-50%] transition-all duration-300
                  ${keyboardActive ? "!top-[10px]" : "!top-[160px]"}
                  ${showAnimatedCharacter ? "h-[445px] w-[244px] flex-shrink-0" : "h-[410px] w-[225px]"}
                `}
                style={{
                  left: "50%",
                  marginLeft: showAnimatedCharacter
                    ? "0px"
                    : "-10.5px",
                  aspectRatio: showAnimatedCharacter
                    ? "244 / 445"
                    : "auto",
                  zIndex: showAnimatedCharacter
                    ? (1 as any)
                    : ("auto" as any),
                }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt="BoKnee Character"
                    className={
                      showAnimatedCharacter
                        ? "absolute w-full h-full object-contain"
                        : "absolute h-[246.16%] left-[-43.83%] max-w-none top-[-70.83%] w-[317.68%]"
                    }
                    src={
                      showAnimatedCharacter
                        ? characterGif
                        : img113
                    }
                  />
                </div>
              </div>

              {/* Knee Highlight - only show when not in animated character mode */}
              {!showAnimatedCharacter && (
                <KneeHighlight
                  keyboardActive={keyboardActive}
                  onClick={handleKneeClick}
                />
              )}

              {/* Tap the knee to learn more text */}
              {!showAnimatedCharacter &&
                !keyboardActive &&
                messages.length === 0 && (
                  <div
                    className="absolute left-1/2 translate-x-[-50%] transition-all duration-300 pointer-events-none"
                    style={{
                      top: "590px",
                      zIndex: 5,
                    }}
                  >
                    <p
                      className="text-center text-black text-[16px] m-0 leading-[20px]"
                      style={{ opacity: 0.4 }}
                    >
                      Tap the knee to learn more
                    </p>
                  </div>
                )}
            </div>

            {/* Character Mask */}
            {/* <MaskGroup keyboardActive={keyboardActive} /> */}

            {/* Emotion Buttons */}
            <EmotionButtons
              keyboardActive={keyboardActive}
              onDownClick={handleDownClick}
            />

            {/* Input Box */}
            <InputBox
              onSubmit={addMessage}
              onKeyboardToggle={setKeyboardActive}
            />

            {/* Chat Messages */}
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              keyboardActive={keyboardActive}
              onBackgroundClick={handleReturnToHome}
            />
          </div>
        </div>
      </div>

      {/* Knee Modal */}
      <KneeModal
        isOpen={showKneeModal}
        onClose={handleCloseKneeModal}
        aiSummary={aiSummary}
      />
    </div>
  );
}