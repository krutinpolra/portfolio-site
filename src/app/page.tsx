// This will redirect "/" → "/main"
export default function RedirectToMain() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.location.href = "/main"`,
      }}
    />
  );
}
