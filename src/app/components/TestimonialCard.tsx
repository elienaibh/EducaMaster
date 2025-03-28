import Image from 'next/image';
import Card from './Card';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
}

export default function TestimonialCard({ name, role, image, content }: TestimonialCardProps) {
  return (
    <Card>
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 mr-4">
          <Image src={image} alt={name} fill className="rounded-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-600">{content}</p>
    </Card>
  );
}
