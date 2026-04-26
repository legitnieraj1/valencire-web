import Image from "next/image";

// Using the uploaded user image that contains both the VC mark and the Valenciré wordmark
export const VCMark = ({ size = 40, color }: { size?: number | string, color?: string }) => {
  const numericSize = typeof size === 'string' ? parseInt(size, 10) : size;
  // Increase size slightly because the image has padding around it
  const adjustedSize = numericSize * 1.5; 
  
  return (
    <div className="relative" style={{ width: adjustedSize, height: adjustedSize }}>
      <Image 
        src="/images/logo_final.png" 
        alt="Valencire Logo" 
        fill 
        className="object-contain"
        priority
      />
    </div>
  );
};

// The image already includes the text "VALENCIRÉ", so we return nothing here to prevent duplicate text
export const ValencireWordmark = ({ size, color }: { size?: string, color?: string }) => null;
