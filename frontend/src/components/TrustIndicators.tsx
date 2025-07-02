import { ShieldCheck, Truck, PackageCheck } from "lucide-react";

const TrustIndicators = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/50 opacity-0 animate-fade-in-down [animation-delay:1100ms]">
      <div className="flex items-center space-x-4 text-[#6153E0]/90">
        <ShieldCheck size={32} className="text-[#6153E0]" />
        <div>
          <h4 className="font-semibold">Secure Checkout</h4>
          <p className="text-sm text-[#6153E0]/70">Guaranteed safe & secure.</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-[#6153E0]/90">
        <Truck size={32} className="text-[#6153E0]" />
        <div>
          <h4 className="font-semibold">Fast Shipping</h4>
          <p className="text-sm text-[#6153E0]/70">Nationwide delivery.</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-[#6153E0]/90">
        <PackageCheck size={32} className="text-[#6153E0]" />
        <div>
          <h4 className="font-semibold">Quality Assured</h4>
          <p className="text-sm text-[#6153E0]/70">
            100% satisfaction guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
