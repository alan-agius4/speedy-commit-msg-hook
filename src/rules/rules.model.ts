export interface RulesResult {
	message: string;
	failed: boolean;
}

export type CommitMessagePart = "Subject" | "Message" | "Scope" | "Type";

export const COMMIT_MESSAGE_PART = {
	Subject: "Subject" as CommitMessagePart,
	Scope: "Scope" as CommitMessagePart,
	Message: "Message" as CommitMessagePart,
	Type: "Type" as CommitMessagePart
};