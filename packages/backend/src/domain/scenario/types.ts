export interface Scenario {
  id: string;
  authorId: string;
  title: string;
  imageUrl: string;
  path: string;
  published: boolean;
}
type UUID = string;
export interface UpsertResponse {
  upsertPostRinneScenario: {
    id: UUID;
  };
}
