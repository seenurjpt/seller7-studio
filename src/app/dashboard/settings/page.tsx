import { Card } from "@heroui/react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <Card.Header>
          <h2 className="font-display w-full text-3xl font-medium text-ink">
            Settings
          </h2>
        </Card.Header>
        <Card.Content>
          <p className="text-muted">Account settings are coming soon.</p>
        </Card.Content>
      </Card>
    </div>
  );
}
