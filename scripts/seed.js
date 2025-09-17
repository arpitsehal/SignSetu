"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv"); // Import dotenv first
// Provide the absolute path to your .env file
dotenv_1.default.config({ path: 'c:\\Users\\sehal\\Documents\\SignSetu\\flashcard-frenzy\\.env', override: true });
var mongoose_1 = require("mongoose");
var FlashcardSet_1 = require("@/models/FlashcardSet"); // Changed from '../src/models/FlashcardSet'
var mockFlashcardSets = [
    {
        title: 'General Knowledge',
        description: 'A set of general knowledge flashcards.',
        createdBy: new mongoose_1.default.Types.ObjectId(), // Placeholder, replace with a real user ID if available
        isPublic: true,
        category: 'General Knowledge',
        difficulty: 'medium',
        flashcards: [
            { question: 'What is the capital of France?', answer: 'Paris', points: 100 },
            { question: 'Which planet is known as the Red Planet?', answer: 'Mars', points: 100 },
            { question: 'What is 2 + 2?', answer: '4', points: 50 },
            { question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean', points: 150 },
        ],
    },
    {
        title: 'Science Basics',
        description: 'Fundamental science questions.',
        createdBy: new mongoose_1.default.Types.ObjectId(), // Placeholder
        isPublic: true,
        category: 'Science',
        difficulty: 'easy',
        flashcards: [
            { question: 'What is the chemical symbol for water?', answer: 'H2O', points: 50 },
            { question: 'What force keeps us on the ground?', answer: 'Gravity', points: 75 },
            { question: 'What is the powerhouse of the cell?', answer: 'Mitochondria', points: 120 },
        ],
    },
    {
        title: 'History Highlights',
        description: 'Key events and figures in history.',
        createdBy: new mongoose_1.default.Types.ObjectId(), // Placeholder
        isPublic: true,
        category: 'History',
        difficulty: 'hard',
        flashcards: [
            { question: 'Who was the first Roman Emperor?', answer: 'Augustus', points: 150 },
            { question: 'In what year did World War II end?', answer: '1945', points: 100 },
            { question: 'Who discovered America?', answer: 'Christopher Columbus', points: 75 },
        ],
    },
];
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var connectToDatabase, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('../src/lib/mongodb'); })];
                case 1:
                    connectToDatabase = (_a.sent()).connectToDatabase;
                    return [4 /*yield*/, connectToDatabase()];
                case 2:
                    _a.sent(); // Call connectToDatabase after dotenv has loaded
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 7, , 8]);
                    return [4 /*yield*/, connectToDatabase()];
                case 4:
                    _a.sent();
                    console.log('Connected to MongoDB.');
                    return [4 /*yield*/, FlashcardSet_1.default.deleteMany({})];
                case 5:
                    _a.sent();
                    console.log('Cleared existing flashcard sets.');
                    return [4 /*yield*/, FlashcardSet_1.default.insertMany(mockFlashcardSets)];
                case 6:
                    _a.sent();
                    console.log('Seeded database with mock flashcard sets.');
                    mongoose_1.default.disconnect();
                    console.log('Disconnected from MongoDB.');
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error seeding database:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
seedDatabase();
