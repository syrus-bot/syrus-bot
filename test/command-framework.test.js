const assert = require("assert");
const CommandStore = require("../src/lib/structures/CommandStore");
const SyrusCommand = require("../src/lib/structures/SyrusCommand");
const sinon = require("sinon");

function execAfterEach() {
	sinon.restore();
}

describe("command framework", function () {
	describe("store", function () {
		afterEach(execAfterEach);

		it("should instantiate", () => {
			const MockStore = sinon.spy(CommandStore);
			const store = new MockStore();
			assert.ok(MockStore.calledOnce);
			assert.ok(!MockStore.threw());
		});
	});

	describe("class", function () {
		const context = {
			extras: {
				client: sinon.fake()
			},
			store: sinon.fake()
		};
		const path = process.cwd();

		afterEach(execAfterEach);

		it("should instantiate", () => {
			let command;
			const MockCommand = sinon.spy(SyrusCommand);
			command = new MockCommand({
				...context,
				path: path,
			}, {name: "mock"});
			assert.ok(MockCommand.calledOnce);
			assert.ok(!MockCommand.threw());
			MockCommand.resetHistory();
			command = new MockCommand({
				...context,
				path: path,
				name: "mock",
			}, {});	
			assert.ok(MockCommand.calledOnce);
			assert.ok(!MockCommand.threw());
		});


		function testCategory(path, category) {
			const MockCommand = sinon.spy(SyrusCommand);
			const command = new MockCommand({
				...context,
				name: "mock",
				path: path
			}, {});
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
			command = new MockCommand({
				...context,
				name: "mock",
				path: path
			}, {});
			assert.strictEqual(command.usage, "mock [...args]");
			MockCommand.resetHistory();
			command = new MockCommand({
				...context,
				name: "mock",
				path: path
			}, {usage: "mock <usage> [usage] (usage)"});
			assert.strictEqual(command.usage, "mock <usage> [usage] (usage)");
		});
	});
});
