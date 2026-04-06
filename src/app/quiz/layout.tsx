export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            [data-site-header],
            [data-site-footer] { display: none !important; }
          `,
        }}
      />
      {children}
    </>
  );
}
