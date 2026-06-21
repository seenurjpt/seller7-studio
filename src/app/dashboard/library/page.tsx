import { Card } from "@heroui/react";

export default function LibraryPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <Card.Header>
          <h2 className="font-display w-full text-3xl font-medium text-ink">
            My Creatives
          </h2>
        </Card.Header>
        <Card.Content>
          <p className="text-muted">Your creative library is coming soon.</p>
        </Card.Content>
      </Card>
    </div>
  );
}
