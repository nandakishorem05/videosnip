import { create } from "zustand";

export type ClipType = "reel" | "short" | "tiktok" | "audio";

export interface VideoClip {
  id: string;
  name: string;
  duration: string;
  type: ClipType;
  url?: string;
  size?: string;
  thumbnail?: string;
}

export interface ProcessingOptions {
  convertToVertical: boolean;
  trimStart: number;
  trimEnd: number;
  addCaptions: boolean;
  extractAudio: boolean;
  captionText?: string;
}

interface VideoStore {
  // Upload state
  uploadedFile: File | null;
  uploadId: string | null;
  uploadProgress: number;
  isUploading: boolean;

  // Processing state
  isProcessing: boolean;
  processingProgress: number;
  processingStep: string;

  // Options
  options: ProcessingOptions;

  // Output
  generatedClips: VideoClip[];

  // Actions
  setUploadedFile: (file: File | null) => void;
  setUploadId: (id: string | null) => void;
  setUploadProgress: (progress: number) => void;
  setIsUploading: (isUploading: boolean) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setProcessingProgress: (progress: number) => void;
  setProcessingStep: (step: string) => void;
  setOptions: (options: Partial<ProcessingOptions>) => void;
  setGeneratedClips: (clips: VideoClip[]) => void;
  resetAll: () => void;
}

const defaultOptions: ProcessingOptions = {
  convertToVertical: true,
  trimStart: 0,
  trimEnd: 100,
  addCaptions: false,
  extractAudio: false,
  captionText: "",
};

export const useVideoStore = create<VideoStore>((set) => ({
  uploadedFile: null,
  uploadId: null,
  uploadProgress: 0,
  isUploading: false,
  isProcessing: false,
  processingProgress: 0,
  processingStep: "",
  options: defaultOptions,
  generatedClips: [],

  setUploadedFile: (file) => set({ uploadedFile: file }),
  setUploadId: (id) => set({ uploadId: id }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setProcessingProgress: (progress) => set({ processingProgress: progress }),
  setProcessingStep: (step) => set({ processingStep: step }),
  setOptions: (newOptions) =>
    set((state) => ({ options: { ...state.options, ...newOptions } })),
  setGeneratedClips: (clips) => set({ generatedClips: clips }),
  resetAll: () =>
    set({
      uploadedFile: null,
      uploadId: null,
      uploadProgress: 0,
      isUploading: false,
      isProcessing: false,
      processingProgress: 0,
      processingStep: "",
      options: defaultOptions,
      generatedClips: [],
    }),
}));
