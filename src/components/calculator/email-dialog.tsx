"use client";

import { useState } from 'react';
import { CalculationResult } from '@/types/calculator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface EmailDialogProps {
  result: CalculationResult;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailDialog({ result, open, onOpenChange }: EmailDialogProps) {
  const t = useTranslations('calculator.email_dialog');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);

    try {
      const { sendBudgetEmail } = await import('@/app/[locale]/calculadora/actions');
      const emailResult = await sendBudgetEmail({
        result,
        recipientEmail: email,
        recipientName: name || undefined,
      });

      if (emailResult.success) {
        alert(t('success'));
        onOpenChange(false);
        setEmail('');
        setName('');
      } else {
        alert(`${t('send_error')}: ${emailResult.error}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('unexpected_error'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t('name_optional')}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t('name_placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSending}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSending}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" className="flex-1" disabled={isSending || !email}>
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('sending')}
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  {t('send')}
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          {t('footer')}
        </p>
      </DialogContent>
    </Dialog>
  );
}
