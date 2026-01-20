
export const BLOG_TEMPLATES = [
    {
        name: "Product Review",
        description: "A structured review with pros, cons, and a rating card.",
        content: `
      <h1>Product Name Review</h1>
      <p>Introductory paragraph about the product...</p>
      
      <div data-type="info-card" data-type-attr="info">
        <p><strong>Quick Verdict:</strong> A great product for...</p>
      </div>

      <h2>Key Features</h2>
      <ul>
        <li>Feature 1: Description</li>
        <li>Feature 2: Description</li>
      </ul>

      <h2>Pros & Cons</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <h3 style="color: #166534">Pros</h3>
          <ul>
            <li>Pro 1</li>
            <li>Pro 2</li>
          </ul>
        </div>
        <div>
          <h3 style="color: #991b1b">Cons</h3>
          <ul>
            <li>Con 1</li>
            <li>Con 2</li>
          </ul>
        </div>
      </div>

      <h2>Conclusion</h2>
      <p>Final thoughts...</p>
    `
    },
    {
        name: "Tutorial / Guide",
        description: "Step-by-step instructions with prerequisites.",
        content: `
      <h1>How to Achieve Goal</h1>
      <p>Brief explanation of what we are building...</p>

      <div data-type="info-card" data-type-attr="warning">
        <p><strong>Prerequisites:</strong> Make sure you have...</p>
      </div>

      <h2>Step 1: Setup</h2>
      <p>Instructions...</p>
      <pre><code>npm install package</code></pre>

      <h2>Step 2: Configuration</h2>
      <p>Details...</p>

      <div data-type="info-card" data-type-attr="success">
        <p><strong>Tip:</strong> You can optimize this by...</p>
      </div>

      <h2>Conclusion</h2>
      <p>Wrap up...</p>
    `
    },
    {
        name: "News / Announcement",
        description: "Standard layout for news and updates.",
        content: `
      <h1>Major Announcement Title</h1>
      <p><strong>Date:</strong> October 2026</p>
      
      <p>We are excited to announce...</p>

      <blockquote>
        "This is a game changer for our industry."
      </blockquote>

      <h2>What to Expect</h2>
      <p>Details...</p>

      <div data-type="info-card" data-type-attr="info">
        <p>Learn more at our documentation page.</p>
      </div>
    `
    }
]
