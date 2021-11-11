import {Rectangle} from './main.js'

describe('test rectangle', () => {

	test('invalid x', () => {
		expect(() => {
			const rect = new Rectangle('lalala', 2, 3, 4)
		}).toThrowError('invalid x')
	})

	test('invalid y', () => {
		expect(() => {
			const rect = new Rectangle(1, true, 3, 4)
		}).toThrowError('invalid y')
	})

	test('invalid height', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, -3000, 4)
		}).toThrowError('invalid height')
	})

	test('invalid width', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, 3000, 4)
			rect.setWidth('f')
		}).toThrowError('invalid width')
	})

	test('invalid rect', () => {
		expect(() => {
			const rect = new Rectangle(1, 2, 3000, 4)
			rect.intersect('123')
		}).toThrowError('invalid rect')
	})

	test('get area', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getArea()).toBe(12)
	})

	test('get perimeter', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getPerimeter()).toBe(14)
	})

	test('get x', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getX()).toBe(1)
	})

	test('get y', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getY()).toBe(2)
	})

	test('get height', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getHeight()).toBe(3)
	})

	test('get width', () => {
		const rect = new Rectangle(1, 2, 3, 4)
		expect(rect.getWidth()).toBe(4)
	})

	test('intersection', () => {
		const rect1 = new Rectangle(1, 2, 3, 4)
		const rect2 = new Rectangle(1, 2, 3, 4)
		expect(rect1.intersect(rect2)).toBe(true)
	})
})
