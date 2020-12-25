const assert = require("assert");
const CommandStore = require("../src/lib/structures/CommandStore");
const SyrusCommand = require("../src/lib/structures/SyrusCommand");
const sinon = require("sinon");

function execAfterEach() {
	sinon.restore();
}

function getCommand(context, options, constructor, store) {
	const Instance = constructor ?? SyrusCommand;
	return new Instance({
		extras: {
			client: sinon.fake()
		},
		store: store ?? sinon.fake(),
		...context
	}, options);
}

describe("command framework", () => {
	describe("store", () => {
		afterEach(execAfterEach);

		it("should instantiate", () => {
			const MockStore = sinon.spy(CommandStore);
			const store = new MockStore(sinon.fake());
			assert.ok(MockStore.calledOnce);
			assert.ok(!MockStore.threw());
		});

		it("should register", () => {
			const MockStore = sinon.spy(CommandStore);
			const store = new MockStore(sinon.fake());
			const piece = getCommand({
				path: "/opt/Syrus/commands/MockCategory/mock.js",
				name: "mock"
			}, {}, SyrusCommand, store);
			store.insert(piece);
			assert.ok(store.has("mock"));
		});

		it("should list categories", () => {
			const MockStore = sinon.spy(CommandStore);
			const store = new MockStore(sinon.fake());
			const pieces = Array.from(
				[["mockOne", "MockCategoryOne"],
				 ["mockTwo", "MockCategoryOne"],
				 ["mockThree", "MockCategoryTwo"]],
				(x) => getCommand({
					name: x[0],
					path: `/opt/Syrus/commands/${x[1]}/${x[0]}.js`
				}, {}, SyrusCommand, store)
			);
			for (const command of pieces) {
				store.insert(command);
			}
			assert.deepStrictEqual(
				store.categories,
				["MockCategoryOne", "MockCategoryTwo"]
			);
			store.unload(pieces[2]);
			assert.deepStrictEqual(
				store.categories,
				["MockCategoryOne"]
			);
			store.insert(pieces[2]);
			store.unload(pieces[0]);
			assert.deepStrictEqual(
				store.categories,
				["MockCategoryOne", "MockCategoryTwo"]
			);
		});

		it("should resolve categories", () => {
			const MockStore = sinon.spy(CommandStore);
			const store = new MockStore(sinon.fake());
			const pieces = Array.from(
				[["mockOne", "MockCategoryOne"],
				 ["mockTwo", "MockCategoryOne"],
				 ["mockThree", "MockCategoryTwo"]],
				(x) => getCommand({
					name: x[0],
					path: `/opt/Syrus/commands/${x[1]}/${x[0]}.js`
				}, {}, SyrusCommand, store)
			);
			for (piece of pieces) {
				store.insert(piece);
			}
			const nil = store.fetchCategory("FakeCategory");
			const two = Array.from(store.fetchCategory("MockCategoryOne"));
			const one = Array.from(store.fetchCategory("MockCategoryTwo"));
			assert.deepStrictEqual(nil, undefined);
			assert.deepStrictEqual(two,
				[[pieces[0].name, pieces[0]],
				 [pieces[1].name, pieces[1]]]
			);
			assert.deepStrictEqual(one, [[pieces[2].name, pieces[2]]]);
		});

		it("should resolve all categories", () => {
			const MockStore = sinon.spy(CommandStore);
			const store = new MockStore(sinon.fake());
			const pieces = Array.from(
				[["mockOne", "MockCategoryOne"],
				 ["mockTwo", "MockCategoryOne"],
				 ["mockThree", "MockCategoryTwo"]],
				(x) => store.insert(getCommand({
					name: x[0],
					path: `/opt/Syrus/commands/${x[1]}/${x[0]}.js`
				}, {}, SyrusCommand, store))
			);
			const resolved = Array.from(
				store.categorized(),
				(category) => Array.from(category)
			);
			const checker = Array.from(
				store.categories,
				(category) => Array.from(store.fetchCategory(category))
			);
			assert.deepStrictEqual(resolved, checker);
		});

		
	});

	describe("class", () => {
		const path = process.cwd();

		afterEach(execAfterEach);

		it("should instantiate", () => {
			let command;
			const MockCommand = sinon.spy(SyrusCommand);
			command = getCommand({path: path}, {name: "mock"}, MockCommand);
			assert.ok(MockCommand.calledOnce);
			assert.ok(!MockCommand.threw());
			MockCommand.resetHistory();
			command = getCommand({path: path, name: "mock"}, {}, MockCommand);
			assert.ok(MockCommand.calledOnce);
			assert.ok(!MockCommand.threw());
		});

		function testCategory(path, category) {
			const MockCommand = sinon.spy(SyrusCommand);
			const command = getCommand({
				name: "mock",
				path: path
			}, {}, MockCommand);
			assert.strictEqual(command.category, category);
		}

		it("should extrapolate category (*NIX)", () => {
			testCategory(
				"/opt/Syrus/commands/MockCategory/mock.js",
				"MockCategory"
			);
		});

		it("should extrapolate category (WIN)", () => {
			testCategory(
				"%APPDATA%\\Syrus\\MockCategory\\mock.js",
				"MockCategory"
			);
		});

		it("should have correct command usage", () => {
			let command;
			const MockCommand = sinon.spy(SyrusCommand);
			command = getCommand({name: "mock", path: path}, {}, MockCommand);
			assert.strictEqual(command.usage, "mock [...args]");
			MockCommand.resetHistory();
			command = getCommand({
				name: "mock",
				path: path
			}, {usage: "mock <usage> [usage] (usage)"}, MockCommand);
			assert.strictEqual(command.usage, "mock <usage> [usage] (usage)");
		});
	});
});