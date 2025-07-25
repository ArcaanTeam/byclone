import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

export interface FakeCheckboxProps {
  label: string; // متنی که کنار چک‌باکس نمایش داده می‌شود
  defaultChecked?: boolean; // مقدار پیش‌فرض
  onChange?: (checked: boolean) => void; // کال‌بک هنگام تغییر
  className?: string; // سفارشی‌سازی ظرف بیرونی
  labelClassName?: string; // سفارشی‌سازی استایل لیبل
  checkedClassName?: string;
}

export const FakeCheckbox: React.FC<FakeCheckboxProps> = ({
  label,
  defaultChecked = false,
  onChange,
  className = "",
  labelClassName = "",
  checkedClassName = "text-[#2F2F2F]",
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  // همگام‌سازی در صورت تغییر propِ defaultChecked در آینده
  useEffect(() => setChecked(defaultChecked), [defaultChecked]);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={}
      className={`w-fit flex items-center gap-2 focus:outline-none ${className}`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-[2px] border ${
          checked ? "border-transparent bg-[white]" : ""
        }`}
      >
        <Check className={`h-3.5 w-3.5 ${checkedClassName}`} />
      </span>

      <span className={`text-sm leading-none text-[#E4E4E4] ${labelClassName}`}>
        {label}
      </span>
    </button>
  );
};
