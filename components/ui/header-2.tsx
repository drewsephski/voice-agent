'use client';
import React from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { SignedIn, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Features',
			href: '/features',
		},
		{
			label: 'Pricing',
			href: '/pricing',
		},
		{
			label: 'About',
			href: '/about',
		},
	];

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (	
		<header	
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
				{
					'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
						scrolled && !open,
					'bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-2': scrolled,
					},
				)}
			>
				<Link href="/" className="flex items-center h-full py-2 hover:opacity-80 transition-opacity">
					<WordmarkIcon className="h-22 w-auto mt-10" />
				</Link>
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className={buttonVariants({ variant: 'ghost' })}
						>
							{link.label}
						</Link>
					))}
					<ThemeToggle />
					<div className='flex items-center gap-2'>
						<Button variant="ghost">
							<SignInButton />
						</Button>
						<Button variant="default">
							<SignUpButton />
						</Button>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</div>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<Button
						size="icon"
						variant="outline"
						onClick={() => setOpen(!open)}
						className="md:hidden"
						aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
						aria-expanded={open}
						aria-controls="mobile-menu"
					>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</div>
			</nav>

			<div
				id="mobile-menu"
				className={cn(
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								onClick={() => setOpen(false)}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start w-full',
								})}
							>
								{link.label}
							</Link>
						))}
					</div>
						<div className="flex flex-col gap-2">
							<Button variant="ghost">
								<SignInButton />
							</Button>
							<Button variant="default">
								<SignUpButton />
							</Button>
							<SignedIn>
								<UserButton />
							</SignedIn>
					</div>
				</div>
			</div>
		</header>
	);
}

export const WordmarkIcon = (props: React.ComponentProps<"svg">) => {
  const { className, ...rest } = props;
  return (
    <svg
      id='Technology_24'
      width='100%'
      height='100%'
      viewBox='0 0 48 48'
      preserveAspectRatio='xMidYMid meet'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={cn('block', className)}
      {...rest}
    >
      <rect width='48' height='48' stroke='none' fill='#000000' opacity='0' />


		<g transform="matrix(0.2 0 0 0.2 12 12)">
		<g>
		<g transform="matrix(1 0 0 1 -0.87 1.55)">
		<path
		  style={{
		    stroke: 'none',
		    strokeWidth: 1,
		    strokeDasharray: 'none',
		    strokeLinecap: 'butt',
		    strokeDashoffset: 0,
		    strokeLinejoin: 'miter',
		    strokeMiterlimit: 4,
		    fill: 'rgb(0,0,0)',
		    fillRule: 'nonzero',
		    opacity: 0.35,
		  }}
		  transform="translate(-49.13, -51.55)"
		  d="M 39.438 92 C 36.395 92 33.722 89.841 33.083 86.866 L 32.497 84.139 L 30.028 85.788 C 28.956999999999997 86.505 27.708 86.884 26.418 86.884 C 24.683999999999997 86.884 23.052 86.209 21.823999999999998 84.984 L 12.52 75.68 C 10.333 73.494 9.994 70.043 11.711 67.47300000000001 L 14.375 61.875000000000014 L 11.375 62.250000000000014 C 8.4 61.611 5.5 61.106 5.5 58.063 L 5.5 45.042 C 5.5 41.998000000000005 7.659 39.325 10.635 38.687 L 13.361 38.102 L 11.712 35.632999999999996 C 9.995 33.062 10.334999999999999 29.610999999999997 12.520999999999999 27.424999999999997 L 21.822 18.123999999999995 C 23.051 16.894999999999996 24.683 16.219999999999995 26.419 16.219999999999995 C 27.709 16.219999999999995 28.958000000000002 16.598999999999997 30.03 17.316999999999997 L 32.498000000000005 18.965999999999998 L 33.084 16.238999999999997 C 33.723000000000006 13.263999999999998 36.396 11.104999999999997 39.43900000000001 11.104999999999997 L 45.76700000000001 11.104999999999997 C 49.35100000000001 11.104999999999997 52.26700000000001 14.020999999999997 52.26700000000001 17.604999999999997 L 52.26700000000001 27.125999999999998 L 52.26700000000001 35.525 C 53.70600000000001 36.15 55.04500000000001 36.963 56.25100000000001 37.933 L 56.25100000000001 33.5 C 56.25100000000001 29.916 59.16700000000001 27 62.75100000000001 27 L 68.53800000000001 27 C 70.47900000000001 24.46 73.53000000000002 22.875 76.876 22.875 C 82.66600000000001 22.875 87.376 27.585 87.376 33.375 C 87.376 36.447 86.051 39.214 83.941 41.136 C 88.929 41.947 92.751 46.285000000000004 92.751 51.5 C 92.751 57.103 88.34 61.694 82.809 61.985 C 85.352 63.903 87 66.95 87 70.375 C 87 76.165 82.29 80.875 76.5 80.875 C 73.07 80.875 69.983 79.242 68.056 76.625 L 67.125 76.625 C 63.541 76.625 60.625 73.709 60.625 70.125 L 60.625 59.972 C 58.766 63.339 55.824 66.036 52.266 67.58 L 52.266 85.5 C 52.266 89.084 49.35 92 45.766 92 L 39.438 92 z"
		  strokeLinecap="round"
		/>
				</g>
				<g transform="matrix(1 0 0 1 -2.87 -0.45)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(242,242,242)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-47.13, -49.55)"
						d="M 37.438 90 C 34.395 90 31.722 87.841 31.083000000000002 84.866 L 30.497000000000003 82.139 L 28.028000000000002 83.788 C 26.957 84.505 25.708000000000002 84.884 24.418000000000003 84.884 C 22.684000000000005 84.884 21.052000000000003 84.209 19.824 82.984 L 10.52 73.68 C 8.333 71.494 7.994 68.043 9.711 65.47300000000001 L 11.361 63.00400000000001 L 8.633000000000001 62.41800000000001 C 5.659 61.779 3.5 59.106 3.5 56.063 L 3.5 43.042 C 3.5 39.998000000000005 5.659 37.325 8.635 36.687 L 11.361 36.102 L 9.712 33.632999999999996 C 7.994999999999999 31.061999999999994 8.334999999999999 27.610999999999997 10.520999999999999 25.424999999999997 L 19.822 16.123999999999995 C 21.051 14.894999999999996 22.683 14.219999999999995 24.419 14.219999999999995 C 25.709 14.219999999999995 26.958000000000002 14.598999999999995 28.03 15.316999999999995 L 30.498 16.965999999999994 L 31.084 14.238999999999994 C 31.723 11.263999999999994 34.396 9.104999999999993 37.439 9.104999999999993 L 43.767 9.104999999999993 C 47.351000000000006 9.104999999999993 50.267 12.020999999999994 50.267 15.604999999999993 L 50.267 25.125999999999994 L 50.267 33.52499999999999 C 51.706 34.14999999999999 53.045 34.962999999999994 54.251000000000005 35.93299999999999 L 54.251000000000005 31.5 C 54.251000000000005 27.916 57.167 25 60.751000000000005 25 L 66.53800000000001 25 C 68.47900000000001 22.46 71.53000000000002 20.875 74.876 20.875 C 80.66600000000001 20.875 85.376 25.585 85.376 31.375 C 85.376 34.447 84.051 37.214 81.941 39.136 C 86.929 39.947 90.751 44.285000000000004 90.751 49.5 C 90.751 55.103 86.34 59.694 80.809 59.985 C 83.352 61.903 85 64.95 85 68.375 C 85 74.165 80.29 78.875 74.5 78.875 C 71.07 78.875 67.983 77.242 66.056 74.625 L 65.125 74.625 C 61.541 74.625 58.625 71.709 58.625 68.125 L 58.625 57.972 C 56.766 61.339 53.824 64.036 50.266 65.58 L 50.266 83.5 C 50.266 87.084 47.35 90 43.766 90 L 37.438 90 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 14.4 -0.5)" >
					<rect
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(64,57,110)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						x="-11.6"
						y="-1.5"
						rx="0"
						ry="0"
						width="23.2"
						height="3"
					/>
				</g>
				<g transform="matrix(1 0 0 1 30.5 -0.5)" >
					<circle
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(216,65,120)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						cx="0"
						cy="0"
						r="4"
					/>
				</g>
				<g transform="matrix(1 0 0 1 30.5 -0.5)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(64,57,110)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-80.5, -49.5)"
						d="M 80.5 55 C 77.468 55 75 52.532 75 49.5 C 75 46.467 77.468 44 80.5 44 C 83.532 44 86 46.467 86 49.5 C 86 52.532 83.532 55 80.5 55 z M 80.5 47 C 79.121 47 78 48.122 78 49.5 C 78 50.878 79.121 52 80.5 52 C 81.879 52 83 50.878 83 49.5 C 83 48.122 81.879 47 80.5 47 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 24.88 -18.5)" >
					<circle
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(255,197,113)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						cx="0"
						cy="0"
						r="4"
					/>
				</g>
				<g transform="matrix(1 0 0 1 24.88 -18.5)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(64,57,110)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-74.88, -31.5)"
						d="M 74.875 37 C 71.843 37 69.375 34.533 69.375 31.5 C 69.375 28.467 71.843 26 74.875 26 C 77.907 26 80.375 28.467 80.375 31.5 C 80.375 34.533 77.907 37 74.875 37 z M 74.875 29 C 73.496 29 72.375 30.122 72.375 31.5 C 72.375 32.878 73.496 34 74.875 34 C 76.254 34 77.375 32.878 77.375 31.5 C 77.375 30.122 76.254 29 74.875 29 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 24.5 18)" >
					<circle
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(255,197,113)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						cx="0"
						cy="0"
						r="4"
					/>
				</g>
				<g transform="matrix(1 0 0 1 24.5 18)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(64,57,110)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-74.5, -68)"
						d="M 74.5 73.5 C 71.468 73.5 69 71.032 69 68 C 69 64.968 71.468 62.5 74.5 62.5 C 77.532 62.5 80 64.968 80 68 C 80 71.032 77.532 73.5 74.5 73.5 z M 74.5 65.5 C 73.121 65.5 72 66.621 72 68 C 72 69.379 73.121 70.5 74.5 70.5 C 75.879 70.5 77 69.379 77 68 C 77 66.621 75.879 65.5 74.5 65.5 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 -22.99 -0.45)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(112,124,192)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-27.01, -49.55)"
						d="M 43.891 15.604 L 37.562999999999995 15.604 L 36.00899999999999 22.838 C 34.21999999999999 23.377000000000002 32.504999999999995 24.09 30.886999999999993 24.959 L 24.541999999999994 20.719 L 15.240999999999994 30.020000000000003 L 19.480999999999995 36.365 C 18.610999999999994 37.983000000000004 17.898999999999994 39.697 17.358999999999995 41.487 L 10.124999999999995 43.041000000000004 L 10.124999999999995 56.062000000000005 L 17.358999999999995 57.61600000000001 C 17.897999999999996 59.40500000000001 18.610999999999994 61.120000000000005 19.480999999999995 62.73800000000001 L 15.240999999999994 69.08300000000001 L 24.541999999999994 78.38400000000001 L 30.886999999999993 74.14400000000002 C 32.504999999999995 75.01400000000002 34.218999999999994 75.72600000000001 36.00899999999999 76.26500000000001 L 37.562999999999995 83.49900000000001 L 43.891 83.49900000000001 L 43.891 15.604 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 -22.96 -0.5)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(112,124,192)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-27.04, -49.5)"
						d="M 43.891 76.055 C 29.336 75.956 17.566 64.131 17.566 49.55200000000001 C 17.566 34.974000000000004 29.336 23.148000000000007 43.891 23.049000000000007 L 43.954 15.499000000000006 L 37.626 15.499000000000006 L 36.009 22.838000000000008 C 34.22 23.37700000000001 32.505 24.090000000000007 30.887 24.959000000000007 L 24.542 20.71900000000001 L 15.241000000000001 30.02000000000001 L 19.481 36.36500000000001 C 18.611 37.98300000000001 17.899 39.69700000000001 17.359 41.48700000000001 L 10.125000000000002 43.04100000000001 L 10.125000000000002 56.06200000000001 L 17.359 57.616000000000014 C 17.898000000000003 59.405000000000015 18.611 61.12000000000001 19.481 62.738000000000014 L 15.241000000000001 69.08300000000001 L 24.542 78.38400000000001 L 30.887 74.14400000000002 C 32.505 75.01400000000002 34.219 75.72600000000001 36.009 76.26500000000001 L 37.563 83.49900000000001 L 43.891000000000005 83.49900000000001 L 43.891000000000005 76.055 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 14.94 -10.75)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(64,57,110)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-64.94, -39.25)"
						d="M 62 48.5 L 59 48.5 L 59 31.5 C 59 30.671 59.672 30 60.5 30 L 70.875 30 L 70.875 33 L 62 33 L 62 48.5 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 17 9.69)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(64,57,110)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-67, -59.69)"
						d="M 70.5 69.5 L 65 69.5 C 64.172 69.5 63.5 68.828 63.5 68 L 63.5 49.875 L 66.5 49.875 L 66.5 66.5 L 70.5 66.5 L 70.5 69.5 z"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 -16.88 -0.5)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(154,162,230)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-33.13, -49.5)"
						d="M 42.625 68.5 C 32.132 68.5 23.625 59.993 23.625 49.5 C 23.625 39.007 32.132 30.5 42.625 30.5"
						strokeLinecap="round"
					/>
				</g>
				<g transform="matrix(1 0 0 1 -6.55 -0.45)" >
					<circle
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(112,124,192)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						cx="0"
						cy="0"
						r="10.076"
					/>
				</g>
				<g transform="matrix(1 0 0 1 -6.5 -0.5)" >
					<circle
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(150,195,98)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						cx="0"
						cy="0"
						r="4.5"
					/>
				</g>
				<g transform="matrix(1 0 0 1 -17.85 -0.5)" >
					<path
						style={{
							stroke: 'none',
							strokeWidth: 1,
							strokeDasharray: 'none',
							strokeLinecap: 'butt',
							strokeDashoffset: 0,
							strokeLinejoin: 'miter',
							strokeMiterlimit: 4,
							fill: 'rgb(64,57,110)',
							fillRule: 'nonzero',
							opacity: 1,
						}}
						transform=" translate(-32.15, -49.5)"
						d="M 43.766 85 L 37.437999999999995 85 C 36.730999999999995 85 36.12 84.507 35.971999999999994 83.815 L 34.599999999999994 77.42999999999999 C 33.318999999999996 77.00099999999999 32.06699999999999 76.48299999999999 30.859999999999992 75.883 L 25.25099999999999 79.631 C 24.65499999999999 80.029 23.86399999999999 79.95 23.356999999999992 79.444 L 14.055999999999992 70.143 C 13.549999999999992 69.637 13.471999999999992 68.844 13.868999999999993 68.249 L 17.61799999999999 62.63999999999999 C 17.016999999999992 61.43299999999999 16.49899999999999 60.17999999999999 16.069999999999993 58.89999999999999 L 9.685999999999993 57.52799999999999 C 8.994 57.381 8.5 56.77 8.5 56.063 L 8.5 43.042 C 8.5 42.335 8.994 41.724000000000004 9.685 41.576 L 16.069000000000003 40.204 C 16.498 38.922 17.017000000000003 37.67 17.617000000000004 36.464 L 13.868000000000004 30.854999999999997 C 13.470000000000004 30.259999999999998 13.548000000000004 29.467 14.055000000000003 28.961 L 23.356 19.659999999999997 C 23.861 19.153999999999996 24.654000000000003 19.075999999999997 25.25 19.472999999999995 L 30.859 23.221999999999994 C 32.067 22.620999999999995 33.32 22.101999999999993 34.604 21.671999999999993 L 36.035 15.177999999999994 C 36.187 14.49 36.796 14 37.5 14 L 43.828 14 C 44.228 14 44.611000000000004 14.16 44.893 14.444 C 45.175 14.728000000000002 45.331 15.112 45.328 15.512 L 45.265 23.062 L 45.265 37.241 C 51.276 38.172 55.798 43.327 55.798 49.553 C 55.798 55.778999999999996 51.276 60.933 45.265 61.864 L 45.265 83.5 C 45.266 84.328 44.594 85 43.766 85 z M 38.649 82 L 42.265 82 L 42.265 60.504 C 42.265 59.699 42.901 59.037 43.705 59.004999999999995 C 48.804 58.80199999999999 52.798 54.64999999999999 52.798 49.553 C 52.798 44.455999999999996 48.804 40.303 43.705 40.099999999999994 C 42.900999999999996 40.068 42.265 39.40599999999999 42.265 38.60099999999999 L 42.315 17 L 38.705 17 L 37.347 23.161 C 37.230000000000004 23.692 36.835 24.118000000000002 36.315 24.274 C 34.635999999999996 24.78 33.006 25.456 31.47 26.281000000000002 C 30.983 26.543000000000003 30.387999999999998 26.515000000000004 29.927 26.207 L 24.605 22.651 L 17.045 30.211 L 20.601000000000003 35.533 C 20.909000000000002 35.994 20.938000000000002 36.588 20.675000000000004 37.076 C 19.849000000000004 38.612 19.175000000000004 40.242 18.669000000000004 41.92 C 18.512000000000004 42.443000000000005 18.082000000000004 42.839 17.548000000000005 42.954 L 11.499000000000006 44.254 L 11.499000000000006 54.851 L 17.548000000000005 56.150999999999996 C 18.082000000000004 56.266 18.512000000000004 56.662 18.669000000000004 57.184999999999995 C 19.174000000000003 58.861999999999995 19.850000000000005 60.492 20.675000000000004 62.029999999999994 C 20.938000000000006 62.51899999999999 20.909000000000006 63.111999999999995 20.601000000000003 63.57299999999999 L 17.045 68.89399999999999 L 24.605 76.454 L 29.927 72.898 C 30.389 72.589 30.982 72.562 31.47 72.824 C 33.007999999999996 73.64999999999999 34.638 74.325 36.314 74.83 C 36.837 74.988 37.233 75.417 37.348 75.951 L 38.649 82 z"
						strokeLinecap="round"
					/>
				</g>
			</g>
		</g>
    </svg>
  );
};
