import { ReportForm } from "@/components/report-form";

export default function ReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Report a Lost or Found Pet</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          Help reunite pets with their owners. Your report will be instantly summarized and added to our community map.
        </p>
      </section>
      
      <ReportForm />
    </div>
  );
}
