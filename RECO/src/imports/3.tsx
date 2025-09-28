import img113 from "figma:asset/f8bb7dc1ddf8f08be2685db94619d128ba4cad73.png";
import { img112 } from "./svg-v8kfh";

function Group5() {
  return (
    <div className="absolute contents left-[46px] top-[753px]">
      <div className="absolute bg-white h-[48px] left-[46px] rounded-[65px] top-[753px] w-[301px]" />
      <p className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[22px] left-[84px] text-[18px] text-[rgba(51,51,51,0.4)] text-nowrap top-[766px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ask me anything...
      </p>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents left-[124px] top-[443px]" data-name="Mask group">
      <div className="absolute h-[410px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[45px_216px] mask-size-[95px_95px] pointer-events-none top-[227px] translate-x-[-50%] w-[225px]" data-name="未标题-1_画板 1 2" style={{ left: "calc(50% - 9.5px)", maskImage: `url('${img112}')` }}>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[246.16%] left-[-43.83%] max-w-none top-[-70.83%] w-[317.68%]" src={img113} />
        </div>
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[79px] top-[227px]">
      <div className="absolute h-[410px] top-[227px] translate-x-[-50%] w-[225px]" data-name="未标题-1_画板 1 1" style={{ left: "calc(50% - 9.5px)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[246.16%] left-[-43.83%] max-w-none top-[-70.83%] w-[317.68%]" src={img113} />
        </div>
      </div>
      <MaskGroup />
    </div>
  );
}

export default function Component3() {
  return (
    <div className="bg-[#f1f1f1] relative size-full" data-name="3">
      <div className="absolute bg-white h-[122px] left-[46px] rounded-[24px] top-[614px] w-[301px]" />
      <p className="absolute font-['Days_One:Regular',_sans-serif] leading-[22px] not-italic text-[#333333] text-[24px] text-nowrap top-[35px] whitespace-pre" style={{ left: "calc(50% - 51px)" }}>
        BoKnee
      </p>
      <div className="absolute font-['Holtwood_One_SC:Regular',_sans-serif] leading-[45px] left-1/2 not-italic text-[#333333] text-[40px] text-center text-nowrap top-[66px] translate-x-[-50%] whitespace-pre">
        <p className="mb-0">How</p>
        <p className="mb-0">{`DO you `}</p>
        <p className="mb-0">feel</p>
        <p>today?</p>
      </div>
      <Group5 />
      <p className="absolute font-['SF_Pro:Regular',_sans-serif] font-normal leading-[22px] left-[67px] text-[20px] text-black top-[631px] w-[267px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        It’s not only about strength — movement quality and symmetry are crucial to avoid re-injury.
      </p>
      <Group12 />
    </div>
  );
}