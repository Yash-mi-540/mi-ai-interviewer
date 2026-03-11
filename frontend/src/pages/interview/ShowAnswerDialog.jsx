import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  PlayIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

function ShowAnswerDialog({ open, onOpenChange, answer }) {
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("answer >>>", answer);

  const playFeedbackAudio = () => {
    if (answer?.feedbackAudioBase64) {
      const audio = new Audio(
        `data:audio/wav;base64,${answer.feedbackAudioBase64}`,
      );
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl max-h-[80vh] overflow-y-auto"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle>Answer Evaluation</DialogTitle>
        </DialogHeader>

        {answer && (
          <div className="space-y-6 py-4">
            {/* Answer Text */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm text-gray-700 mb-2">
                Your Answer:
              </h3>
              <p className="text-gray-900">{answer.answerText}</p>
            </div>

            {/* Scores */}
            {answer.evaluation?.scores && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-sm text-blue-700 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Scores
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(answer.evaluation.scores.correctness)}`}
                    >
                      {answer.evaluation.scores.correctness}%
                    </div>
                    <div className="text-xs text-gray-600">Correctness</div>
                    <div className="text-xs font-medium text-gray-500">
                      {getScoreLabel(answer.evaluation.scores.correctness)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(answer.evaluation.scores.depth)}`}
                    >
                      {answer.evaluation.scores.depth}%
                    </div>
                    <div className="text-xs text-gray-600">Depth</div>
                    <div className="text-xs font-medium text-gray-500">
                      {getScoreLabel(answer.evaluation.scores.depth)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getScoreColor(answer.evaluation.scores.realWorld)}`}
                    >
                      {answer.evaluation.scores.realWorld}%
                    </div>
                    <div className="text-xs text-gray-600">Real World</div>
                    <div className="text-xs font-medium text-gray-500">
                      {getScoreLabel(answer.evaluation.scores.realWorld)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Strengths */}
            {answer.evaluation?.strengths &&
              answer.evaluation.strengths.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-sm text-green-700 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-1">
                    {answer.evaluation.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="text-sm text-green-800 flex items-start"
                      >
                        <span className="text-green-500 mr-2">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Gaps */}
            {answer.evaluation?.gaps && answer.evaluation.gaps.length > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-sm text-red-700 mb-2 flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-1">
                  {answer.evaluation.gaps.map((gap, index) => (
                    <li
                      key={index}
                      className="text-sm text-red-800 flex items-start"
                    >
                      <span className="text-red-500 mr-2">•</span>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {answer.evaluation?.improvements &&
              answer.evaluation.improvements.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-sm text-yellow-700 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Suggestions
                  </h3>
                  <ul className="space-y-1">
                    {answer.evaluation.improvements.map(
                      (improvement, index) => (
                        <li
                          key={index}
                          className="text-sm text-yellow-800 flex items-start"
                        >
                          <span className="text-yellow-500 mr-2">•</span>
                          {improvement}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

            {/* Audio Feedback */}
            {answer.feedbackAudioBase64 && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={playFeedbackAudio}
                  disabled={isPlaying}
                  className="flex items-center space-x-2 bg-[#3538cd] text-white"
                >
                  <PlayIcon className="w-4 h-4" />
                  <span>
                    {isPlaying ? "Playing..." : "Play Feedback Audio"}
                  </span>
                </Button>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-[#3538cd] text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShowAnswerDialog;
