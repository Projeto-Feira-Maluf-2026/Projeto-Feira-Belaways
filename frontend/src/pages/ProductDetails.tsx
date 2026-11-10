import {
  ArrowLeft,
  Barcode,
  Boxes,
  ClipboardEdit,
  ImageOff,
  Link as LinkIcon,
  PackageCheck,
  Ruler,
  Scale,
  Tag,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProduct } from '@/hooks/use-data';
import { formatCurrency, formatDate } from '@/lib/utils';

const valueOrPending = (value: string | number | null | undefined) => value ?? 'Nao informado';

const Field = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
  <div className="rounded-[18px] bg-chip p-4 shadow-[inset_0_0_0_1px_var(--line)]">
    <p className="text-xs font-medium uppercase tracking-normal text-muted">{label}</p>
    <p className="mt-2 break-words text-sm font-medium text-ink">{valueOrPending(value)}</p>
  </div>
);

export const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);

  if (isLoading || !product)
    return <PageHeader title="Produto" description="Carregando cadastro." />;

  const dimensions = product.dimensionsCm;
  const dimensionsText =
    dimensions.width && dimensions.height && dimensions.length
      ? `${dimensions.width} x ${dimensions.height} x ${dimensions.length} cm`
      : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={product.name}
        description={`${product.sku || 'Sem SKU'} • atualizado em ${formatDate(product.updatedAt)}`}
        actions={
          <Link
            to="/products"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[14px] border border-line bg-[var(--glass-a)] px-4 text-sm font-medium text-ink transition hover:bg-chip "
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar
          </Link>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardContent>
            <div className="flex aspect-square items-center justify-center rounded-[14px] bg-chip p-6">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-faint">
                  <ImageOff className="h-10 w-10" aria-hidden="true" />
                  <span className="text-sm">Imagem nao encontrada no Tiny</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader title="Estoque" action={<Boxes className="h-5 w-5 text-pos" />} />
            <CardContent>
              <p className="text-3xl font-semibold text-ink">{valueOrPending(product.stock)}</p>
              <p className="mt-2 text-sm text-muted">
                Reservado {valueOrPending(product.reservedStock)} • Min {product.minimumStock}
                {product.maximumStock !== null ? ` • Max ${product.maximumStock}` : ''}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Preço" action={<Tag className="h-5 w-5 text-accent" />} />
            <CardContent className="space-y-2">
              <p className="text-3xl font-semibold text-ink">{formatCurrency(product.price)}</p>
              <p className="text-sm text-muted">
                Promo{' '}
                {product.promotionalPrice !== null
                  ? formatCurrency(product.promotionalPrice)
                  : 'Nao informado'}
              </p>
              <p className="text-sm text-muted">
                Custo{' '}
                {product.costPrice !== null ? formatCurrency(product.costPrice) : 'Nao informado'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Identificação"
              action={<Barcode className="h-5 w-5 text-accent" />}
            />
            <CardContent className="grid gap-3">
              <Field label="SKU" value={product.sku} />
              <Field label="EAN" value={product.ean} />
              <Field label="NCM" value={product.ncm} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Logística" action={<Ruler className="h-5 w-5 text-accent" />} />
            <CardContent className="grid gap-3">
              <Field label="Dimensões" value={dimensionsText} />
              <Field
                label="Peso líquido"
                value={product.weightKg ? `${product.weightKg} kg` : null}
              />
              <Field
                label="Peso bruto"
                value={product.grossWeightKg ? `${product.grossWeightKg} kg` : null}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader
            title="Cadastro no Tiny"
            action={<PackageCheck className="h-5 w-5 text-accent" />}
          />
          <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <Field label="Categoria" value={product.category} />
            <Field label="Marca" value={product.brand} />
            <Field label="Unidade" value={product.unit} />
            <Field label="Status" value={product.status} />
            <Field label="Localização" value={product.location} />
            <Field label="Fornecedor" value={product.supplierName} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Links e mídia" action={<LinkIcon className="h-5 w-5 text-accent" />} />
          <CardContent className="space-y-3">
            {product.slug ? <Field label="Slug" value={product.slug} /> : null}
            {product.videoUrl ? <Field label="Vídeo" value={product.videoUrl} /> : null}
            <div className="flex flex-wrap gap-2">
              <Badge tone={product.imageUrl ? 'green' : 'amber'}>Imagem</Badge>
              <Badge tone={product.ean ? 'green' : 'amber'}>EAN</Badge>
              <Badge tone={dimensionsText ? 'green' : 'amber'}>Dimensões</Badge>
              <Badge tone={product.weightKg ? 'green' : 'amber'}>Peso</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Descrição" action={<Scale className="h-5 w-5 text-accent" />} />
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-6 text-ink/80">
              {product.description ?? 'Nao informado'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Informações internas"
            action={<ClipboardEdit className="h-5 w-5 text-accent" />}
          />
          <CardContent>
            <textarea
              className="field min-h-32 w-full rounded-control p-3.5 text-sm text-ink outline-none transition placeholder:text-faint focus:border-accent/60 focus:ring-4 focus:ring-accent/15"
              placeholder="Observações internas do time"
            />
            <Button className="mt-3">Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
