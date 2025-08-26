
+(function () {
+  var yearEl = document.getElementById('year');
+  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
+
+  // Soft-scroll for same-page anchors without large libraries
+  function handleAnchorClick(event) {
+    var target = event.target;
+    if (!(target instanceof Element)) return;
+    if (target.tagName.toLowerCase() !== 'a') return;
+    var href = target.getAttribute('href');
+    if (!href || href.charAt(0) !== '#') return;
+    var el = document.querySelector(href);
+    if (!el) return;
+    event.preventDefault();
+    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
+    history.pushState(null, '', href);
+  }
+
+  document.addEventListener('click', handleAnchorClick);
+
+  // Prevent actual submission for demo form
+  var form = document.querySelector('.contact-form');
+  if (form) {
+    form.addEventListener('submit', function (e) {
+      e.preventDefault();
+      var hint = form.querySelector('.form-hint');
+      if (hint) {
+        hint.textContent = 'Thanks! This demo does not send data.';
+      }
+    });
+  }
+})();
+
+
EOF
)
