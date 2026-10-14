// ================= Chat Widget ================= */

const modal = document.getElementById("d24dEventModal");
const modalTitle = document.getElementById("d24dModalTitle");
const modalSummary = document.getElementById("d24dModalSummary");
const modalPoints = document.getElementById("d24dModalPoints");

document.querySelectorAll(".d24d-event-readmore").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();

    modalTitle.textContent = btn.dataset.title;
    modalSummary.textContent = btn.dataset.summary;

    modalPoints.innerHTML = "";
    JSON.parse(btn.dataset.points).forEach(point => {
      const li = document.createElement("li");
      li.textContent = point;
      modalPoints.appendChild(li);
    });

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

document.querySelector(".d24d-modal-close").onclick =
document.querySelector(".d24d-modal-overlay").onclick = () => {
  modal.classList.remove("active");
  document.body.style.overflow = "";
};


// ================= D24D SLIDER BEHAVIOR =================
(function(){
  const tracks = document.querySelectorAll('.d24d-slider-track');
  if(tracks.length === 0) return;

  tracks.forEach(track => {
    const wrapper = track.closest('.d24d-events-wrapper');
    const prevBtn = wrapper ? wrapper.querySelector('.d24d-slider-prev') : null;
    const nextBtn = wrapper ? wrapper.querySelector('.d24d-slider-next') : null;
    const cards = Array.from(track.querySelectorAll('.d24d-event-card'));

    function getScrollStep(){
      if(cards.length < 1) return track.clientWidth;
      const first = cards[0];
      const second = cards[1] || first;
      const gap = Math.max(8, (second.offsetLeft - (first.offsetLeft + first.offsetWidth)) || 16);
      return Math.round(first.offsetWidth + gap);
    }

    prevBtn && prevBtn.addEventListener('click', ()=>{
      track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    nextBtn && nextBtn.addEventListener('click', ()=>{
      track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    // Pointer drag / swipe support
    let isDown = false, startX = 0, scrollLeft = 0;

    track.addEventListener('pointerdown', (e)=>{
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;

      isDown = true;
      track.setPointerCapture(e.pointerId);
      startX = e.clientX;
      scrollLeft = track.scrollLeft;
      track.classList.add('dragging');
    });

    track.addEventListener('pointermove', (e)=>{
      if(!isDown) return;
      const x = e.clientX;
      const walk = startX - x;
      track.scrollLeft = scrollLeft + walk;
    });

    track.addEventListener('pointerup', (e)=>{
      isDown = false;
      try{ track.releasePointerCapture(e.pointerId); }catch(err){}
      track.classList.remove('dragging');
    });

    track.addEventListener('pointercancel', ()=>{ isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mouseleave', ()=>{ if(isDown) isDown = false; track.classList.remove('dragging'); });

    // Snap to nearest card (left aligned) after scrolling stops
    let scrollTimeout = null;
    track.addEventListener('scroll', ()=>{
      if(scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(()=>{
        const left = track.scrollLeft;
        let nearest = null, nearestDist = Infinity;
        cards.forEach(c=>{
          const dist = Math.abs(c.offsetLeft - left);
          if(dist < nearestDist){ nearestDist = dist; nearest = c; }
        });
        if(nearest){
          track.scrollTo({ left: Math.max(0, nearest.offsetLeft), behavior: 'smooth' });
        }
      }, 120);
    });
  });
})();
