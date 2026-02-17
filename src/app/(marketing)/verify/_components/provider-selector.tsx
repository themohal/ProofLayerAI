"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProviderSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProviderSelector({ value, onChange }: ProviderSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="provider" className="text-sm whitespace-nowrap">AI Provider:</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="provider" className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto (Best Match)</SelectItem>
          <SelectItem value="openai">OpenAI</SelectItem>
          <SelectItem value="anthropic">Anthropic</SelectItem>
          <SelectItem value="gemini">Google Gemini</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
