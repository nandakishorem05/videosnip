"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Smartphone,
  Scissors,
  Captions,
  Music,
  Lock,
  Info,
} from "lucide-react";
import { useVideoStore } from "@/lib/store";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface OptionRowProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function OptionRow({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: OptionRowProps) {
  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.005, transition: { duration: 0.15 } }}
      className={cn(
        "glass-card rounded-xl p-4 border border-white/4 transition-colors",
        checked && !disabled && "border-white/8 bg-white/[0.03]"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <div className="min-w-0">
            <Label className="text-sm font-medium cursor-pointer">{label}</Label>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {description}
            </p>
          </div>
        </div>
        <Switch
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          className="shrink-0"
        />
      </div>
    </motion.div>
  );
}

export function ProcessingOptions() {
  const { options, setOptions, uploadedFile } = useVideoStore();
  const isDisabled = !uploadedFile;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
          <Settings className="w-3.5 h-3.5 text-blue-400" />
        </div>
        Processing Options
        {isDisabled && (
          <span className="ml-auto text-xs text-muted-foreground/60 font-normal flex items-center gap-1">
            <Info className="w-3 h-3" /> Upload first
          </span>
        )}
      </h2>

      <div
        className={cn(
          "space-y-3 transition-opacity duration-300",
          isDisabled && "opacity-45 pointer-events-none"
        )}
      >
        {/* Convert to vertical */}
        <OptionRow
          icon={Smartphone}
          iconBg="bg-purple-500/15"
          iconColor="text-purple-400"
          label="Convert to Vertical (9:16)"
          description="Perfect for Reels, Shorts & TikTok"
          checked={options.convertToVertical}
          onChange={(checked) => setOptions({ convertToVertical: checked })}
        />

        {/* Trim video */}
        <motion.div
          className={cn(
            "glass-card rounded-xl p-4 border border-white/4 transition-colors",
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
              <Scissors className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <Label className="text-sm font-medium">Trim Video</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select the portion to keep
              </p>
            </div>
          </div>

          <div className="space-y-3 px-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="font-mono bg-muted/40 px-2 py-0.5 rounded">
                {options.trimStart}%
              </span>
              <span className="text-muted-foreground/50">to</span>
              <span className="font-mono bg-muted/40 px-2 py-0.5 rounded">
                {options.trimEnd}%
              </span>
            </div>
            <Slider
              value={[options.trimStart, options.trimEnd]}
              onValueChange={([start, end]) =>
                setOptions({ trimStart: start, trimEnd: end })
              }
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/50">
              <span>Start</span>
              <span>
                Duration: {Math.round(((options.trimEnd - options.trimStart) / 100) * 100)}%
                of original
              </span>
              <span>End</span>
            </div>
          </div>
        </motion.div>

        {/* Add captions */}
        <OptionRow
          icon={Captions}
          iconBg="bg-green-500/15"
          iconColor="text-green-400"
          label="Add Captions"
          description="Auto-generate text overlay"
          checked={options.addCaptions}
          onChange={(checked) => setOptions({ addCaptions: checked })}
        />

        {/* Caption text input (when captions enabled) */}
        {options.addCaptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-1"
          >
            <input
              type="text"
              placeholder="Enter caption text (optional)"
              value={options.captionText || ""}
              onChange={(e) => setOptions({ captionText: e.target.value })}
              className="w-full text-sm bg-muted/30 border border-white/8 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-purple-500/40 transition-colors"
            />
          </motion.div>
        )}

        {/* Extract audio */}
        <OptionRow
          icon={Music}
          iconBg="bg-pink-500/15"
          iconColor="text-pink-400"
          label="Extract Audio"
          description="Download as MP3 file"
          checked={options.extractAudio}
          onChange={(checked) => setOptions({ extractAudio: checked })}
        />

        {/* Pro feature (locked) */}
        <div className="glass-card rounded-xl p-4 border border-purple-500/20 relative overflow-hidden cursor-not-allowed">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <Label className="text-sm font-medium">AI Smart Crop</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Focus on the speaker automatically
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold gradient-text px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 shrink-0">
              PRO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
