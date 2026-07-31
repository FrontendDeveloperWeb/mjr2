// Minimal, dependency-free PDF writer used to build the final manuscript
// summary. This project's npm install is broken in the current environment
// (EPERM lstat on an unrelated Administrator profile path), so pulling in
// jspdf/@react-pdf/renderer isn't possible here — this hand-rolls just enough
// of the PDF spec (single Helvetica font, paginated left-aligned text) to
// produce a valid multi-page PDF without any external dependency.

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 50;
const LINE_HEIGHT = 14;
const FIRST_LINE_Y = PAGE_HEIGHT - MARGIN;
const LINES_PER_PAGE = Math.floor((PAGE_HEIGHT - MARGIN * 2) / LINE_HEIGHT);
const CHARS_PER_LINE = 95;

function sanitize(value) {
  return String(value ?? '').replace(/[^\x20-\x7E]/g, ' ');
}

function escapePdfText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrap(text, maxChars) {
  const words = sanitize(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [''];
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Flattens a { title, lines }[] outline into { text, size, bold }[] rows, word-wrapped. */
function buildRows(sections) {
  const rows = [{ text: 'Manuscript Submission Summary', size: 16 }, { text: new Date().toLocaleString(), size: 9 }, { text: '', size: 10 }];
  sections.forEach(({ title, lines }) => {
    rows.push({ text: title, size: 12 });
    (lines.length ? lines : ['—']).forEach((line) => {
      wrap(line, CHARS_PER_LINE).forEach((wrapped) => rows.push({ text: wrapped, size: 10 }));
    });
    rows.push({ text: '', size: 10 });
  });
  return rows;
}

function buildPageContentStream(rows) {
  let y = FIRST_LINE_Y;
  const parts = ['BT'];
  rows.forEach(({ text, size }) => {
    parts.push(`/F1 ${size} Tf`);
    parts.push(`1 0 0 1 ${MARGIN} ${y} Tm`);
    parts.push(`(${escapePdfText(text)}) Tj`);
    y -= LINE_HEIGHT;
  });
  parts.push('ET');
  return parts.join('\n');
}

function paginate(rows) {
  const pages = [];
  for (let i = 0; i < rows.length; i += LINES_PER_PAGE) {
    pages.push(rows.slice(i, i + LINES_PER_PAGE));
  }
  return pages.length ? pages : [[]];
}

/** Assembles a minimal valid PDF (one Type1 Helvetica font, N text pages) into a Uint8Array. */
function assemblePdf(pages) {
  const encoder = new TextEncoder();
  const objects = [];
  const pageObjIds = pages.map((_, i) => 4 + i * 2);
  const contentObjIds = pages.map((_, i) => 5 + i * 2);
  const fontObjId = 3;
  const pagesObjId = 2;
  const catalogObjId = 1;

  objects[catalogObjId] = `<< /Type /Catalog /Pages ${pagesObjId} 0 R >>`;
  objects[pagesObjId] = `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pages.length} >>`;
  objects[fontObjId] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';

  pages.forEach((rows, i) => {
    const pageId = pageObjIds[i];
    const contentId = contentObjIds[i];
    objects[pageId] = `<< /Type /Page /Parent ${pagesObjId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontObjId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    const stream = buildPageContentStream(rows);
    const streamBytes = encoder.encode(stream);
    objects[contentId] = { stream, length: streamBytes.length };
  });

  const chunks = ['%PDF-1.4\n'];
  const offsets = [];
  let offset = encoder.encode(chunks[0]).length;

  const maxId = Math.max(catalogObjId, pagesObjId, fontObjId, ...pageObjIds, ...contentObjIds);
  for (let id = 1; id <= maxId; id += 1) {
    offsets[id] = offset;
    const body = objects[id];
    const objStr =
      typeof body === 'string'
        ? `${id} 0 obj\n${body}\nendobj\n`
        : `${id} 0 obj\n<< /Length ${body.length} >>\nstream\n${body.stream}\nendstream\nendobj\n`;
    chunks.push(objStr);
    offset += encoder.encode(objStr).length;
  }

  const xrefStart = offset;
  const xrefLines = ['xref', `0 ${maxId + 1}`, '0000000000 65535 f '];
  for (let id = 1; id <= maxId; id += 1) {
    xrefLines.push(`${String(offsets[id]).padStart(10, '0')} 00000 n `);
  }
  chunks.push(`${xrefLines.join('\n')}\n`);
  chunks.push(`trailer\n<< /Size ${maxId + 1} /Root ${catalogObjId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

  return encoder.encode(chunks.join(''));
}

export function generateManuscriptPdf(data) {
  const step1 = data.step1 || {};
  const step2 = data.step2 || {};
  const step3 = data.step3 || {};
  const step4 = data.step4 || {};
  const step5 = data.step5 || {};
  const step6 = data.step6 || {};

  const sections = [
    {
      title: '1. Article Type Selection',
      lines: [`Article Type: ${step1.articleType || '—'}`, `ORCID iD: ${step1.orcid || 'Not linked'}`],
    },
    {
      title: '2. Attach Files',
      lines: (step2.files || []).length
        ? step2.files.map((f) => `${f.order}. ${f.name} — ${f.itemType} (${f.size})`)
        : ['No files attached'],
    },
    {
      title: '3. General Information',
      lines: [
        `Section/Category: ${step3.section || '—'}`,
        `Classifications: ${(step3.classifications || []).join(', ') || 'None selected'}`,
      ],
    },
    {
      title: '4. Additional Information',
      lines: Object.entries(step4).length
        ? Object.entries(step4).map(([key, value]) => `${key}: ${value ?? '—'}`)
        : ['No responses recorded'],
    },
    {
      title: '5. Comments',
      lines: [step5.comments || 'No comments provided'],
    },
    {
      title: '6. Manuscript Data',
      lines: [
        `Full Title: ${step6.fullTitle || '—'}`,
        `Short Title: ${step6.shortTitle || '—'}`,
        `Abstract: ${step6.abstractText || '—'}`,
        `Keywords: ${step6.keywords || '—'}`,
        `Authors: ${(step6.authors || []).map((a) => a.name).join('; ') || '—'}`,
        `Funding: ${
          (step6.funders || []).map((f) => f.funder).join('; ') ||
          (step6.fundingNA ? 'Not available' : '—')
        }`,
      ],
    },
  ];

  return assemblePdf(paginate(buildRows(sections)));
}

/** Builds the summary PDF and opens it in a new browser tab as an object URL. */
export function openManuscriptPdf(data) {
  const bytes = generateManuscriptPdf(data);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
