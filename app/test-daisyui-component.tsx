'use client';

export default function TestDaisyUIComponent() {
  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">DaisyUI Test Component</h2>
      
      <div className="flex gap-2">
        <button className="btn btn-primary">Primary Button</button>
        <button className="btn btn-secondary">Secondary Button</button>
        <button className="btn btn-accent">Accent Button</button>
        <button className="btn btn-neutral">Neutral Button</button>
      </div>
      
      <div className="flex gap-2">
        <div className="badge badge-primary">Primary Badge</div>
        <div className="badge badge-secondary">Secondary Badge</div>
        <div className="badge badge-accent">Accent Badge</div>
        <div className="badge badge-neutral">Neutral Badge</div>
      </div>
      
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">DaisyUI Card</h2>
          <p>This is a card component from DaisyUI with the hackrpi theme.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Action</button>
          </div>
        </div>
      </div>
    </div>
  );
} 